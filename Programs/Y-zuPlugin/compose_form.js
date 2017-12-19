//From https://github.com/tootsuite/mastodon/blob/master/app/javascript/mastodon/features/compose/components/compose_form.js

import React from 'react';
import CharacterCounter from './character_counter';
import Button from '../../../components/button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ReplyIndicatorContainer from '../containers/reply_indicator_container';
import AutosuggestTextarea from '../../../components/autosuggest_textarea';
import UploadButtonContainer from '../containers/upload_button_container';
import { defineMessages, injectIntl } from 'react-intl';
import Collapsable from '../../../components/collapsable';
import SpoilerButtonContainer from '../containers/spoiler_button_container';
import PrivacyDropdownContainer from '../containers/privacy_dropdown_container';
import SensitiveButtonContainer from '../containers/sensitive_button_container';
import EmojiPickerDropdown from '../containers/emoji_picker_dropdown_container';
import UploadFormContainer from '../containers/upload_form_container';
import WarningContainer from '../containers/warning_container';
import { isMobile } from '../../../is_mobile';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { length } from 'stringz';
import { countableText } from '../util/counter';

const messages = defineMessages({
	placeholder: { id: 'compose_form.placeholder', defaultMessage: 'What is on your mind?' },
	spoiler_placeholder: { id: 'compose_form.spoiler_placeholder', defaultMessage: 'Write your warning here' },
	publish: { id: 'compose_form.publish', defaultMessage: 'Toot' },
	publishLoud: { id: 'compose_form.publish_loud', defaultMessage: '{publish}!' },
});

@injectIntl
export default class ComposeForm extends ImmutablePureComponent {

	static propTypes = {
		intl: PropTypes.object.isRequired,
		text: PropTypes.string.isRequired,
		suggestion_token: PropTypes.string,
		suggestions: ImmutablePropTypes.list,
		spoiler: PropTypes.bool,
		privacy: PropTypes.string,
		spoiler_text: PropTypes.string,
		focusDate: PropTypes.instanceOf(Date),
		preselectDate: PropTypes.instanceOf(Date),
		is_submitting: PropTypes.bool,
		is_uploading: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
		onClearSuggestions: PropTypes.func.isRequired,
		onFetchSuggestions: PropTypes.func.isRequired,
		onSuggestionSelected: PropTypes.func.isRequired,
		onChangeSpoilerText: PropTypes.func.isRequired,
		onPaste: PropTypes.func.isRequired,
		onPickEmoji: PropTypes.func.isRequired,
		showSearch: PropTypes.bool,
	};

	static defaultProps = {
		showSearch: false,
	};

	static UtilBtns = class UtilBtns {
		static VERSION = "v3";

		static IDS = {
			CONTAINER: "utilBtn",
			
			TOKENHOLDER: {
				ROOT: "utilBtn__tokenHolder",

				ACCESSTOKEN: "utilBtn__tokenHolder__input--accessToken",
				AUTH: "utilBtn__tokenHolder__button--auth"
			},

			BUTTONS: {
				GOJI: "utilBtn__button--goji",
				HARUKIN: "utilBtn__button--harukin",
				TOOTRATE: "utilBtn__button--tootRate"
			}
		}

		static CLASSES = {
			BUTTON: "utilBtn__button"
		}

		static TYPE = {
			GOJI: Symbol("ｺﾞｼﾞﾓﾘｨｨｨｨｨｨ!!!"),
			HARUKIN: Symbol("はるきん焼却"),
			TOOTRATE: Symbol("トゥート率投稿")
		}



		static saveToken () {
			localStorage.setItem("com.GenbuProject.UtilBtns.accessToken", document.getElementById(IDS.TOKENHOLDER.ACCESSTOKEN).value);
		}

		static dispatchGoji () {
			let contents = document.querySelector("Textarea.autosuggest-textarea__textarea");

			contents.value = [
				"#誤字に淫夢厨",
				":goji:"
			].join("\r\n");
		}

		static dispatchHarukin () {
			let contents = document.querySelector("Textarea.autosuggest-textarea__textarea");

			contents.value = [
				":harukin: :harukin: :harukin: :harukin: :harukin: :harukin:",
				"🔥 🔥 🔥 🔥 🔥 🔥"
			].join("\r\n");
		}

		static dispatchTootRate () {
			let contents = document.querySelector("Textarea.autosuggest-textarea__textarea");

			let serverInfo = JSON.parse((() => {
				let c = new XMLHttpRequest();
					c.open("GET", "/api/v1/instance", false);
					c.send(null);

				return c.response;
			})());

			let userInfo = JSON.parse((() => {
				let c = new XMLHttpRequest();
					c.open("GET", `/api/v1/accounts/verify_credentials?access_token=${localStorage.getItem("com.GenbuProject.UtilBtns.accessToken")}`, false);
					c.send(null);

				return c.response;
			})());

			let serverToots = serverInfo.stats.status_count,
				userToots = userInfo.statuses_count;

			contents.value = [
				"《トゥート率》",
				`@${userInfo.username} さんの`,
				`トゥート率は${(userToots / serverToots * 100).toFixed(2)}%です！`,
				`(Tooted from UtilBtns ${UtilBtns.VERSION})`
			].join("\r\n");
		}
	};

	handleChange = (e) => {
		this.props.onChange(e.target.value);
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) {
			this.handleSubmit();
		}
	}

	handleSubmit = () => {
		if (this.props.text !== this.autosuggestTextarea.textarea.value) {
			// Something changed the text inside the textarea (e.g. browser extensions like Grammarly)
			// Update the state to match the current text
			this.props.onChange(this.autosuggestTextarea.textarea.value);
		}

		this.props.onSubmit();
	}

	onSuggestionsClearRequested = () => {
		this.props.onClearSuggestions();
	}

	onSuggestionsFetchRequested = (token) => {
		this.props.onFetchSuggestions(token);
	}

	onSuggestionSelected = (tokenStart, token, value) => {
		this._restoreCaret = null;
		this.props.onSuggestionSelected(tokenStart, token, value);
	}

	handleChangeSpoilerText = (e) => {
		this.props.onChangeSpoilerText(e.target.value);
	}

	componentWillReceiveProps (nextProps) {
		// If this is the update where we've finished uploading,
		// save the last caret position so we can restore it below!
		if (!nextProps.is_uploading && this.props.is_uploading) {
			this._restoreCaret = this.autosuggestTextarea.textarea.selectionStart;
		}
	}

	componentDidUpdate (prevProps) {
		// This statement does several things:
		// - If we're beginning a reply, and,
		//     - Replying to zero or one users, places the cursor at the end of the textbox.
		//     - Replying to more than one user, selects any usernames past the first;
		//       this provides a convenient shortcut to drop everyone else from the conversation.
		// - If we've just finished uploading an image, and have a saved caret position,
		//   restores the cursor to that position after the text changes!
		if (this.props.focusDate !== prevProps.focusDate || (prevProps.is_uploading && !this.props.is_uploading && typeof this._restoreCaret === 'number')) {
			let selectionEnd, selectionStart;

			if (this.props.preselectDate !== prevProps.preselectDate) {
				selectionEnd   = this.props.text.length;
				selectionStart = this.props.text.search(/\s/) + 1;
			} else if (typeof this._restoreCaret === 'number') {
				selectionStart = this._restoreCaret;
				selectionEnd   = this._restoreCaret;
			} else {
				selectionEnd   = this.props.text.length;
				selectionStart = selectionEnd;
			}

			this.autosuggestTextarea.textarea.setSelectionRange(selectionStart, selectionEnd);
			this.autosuggestTextarea.textarea.focus();
		} else if(prevProps.is_submitting && !this.props.is_submitting) {
			this.autosuggestTextarea.textarea.focus();
		}
	}

	setAutosuggestTextarea = (c) => {
		this.autosuggestTextarea = c;
	}

	handleEmojiPick = (data) => {
		const position     = this.autosuggestTextarea.textarea.selectionStart;
		const emojiChar    = data.native;
		this._restoreCaret = position + emojiChar.length + 1;
		this.props.onPickEmoji(position, data);
	}

	render () {
		const { intl, onPaste, showSearch } = this.props;
		const disabled = this.props.is_submitting;
		const text     = [this.props.spoiler_text, countableText(this.props.text)].join('');

		let publishText = '';

		if (this.props.privacy === 'private' || this.props.privacy === 'direct') {
			publishText = <span className='compose-form__publish-private'><i className='fa fa-lock' /> {intl.formatMessage(messages.publish)}</span>;
		} else {
			publishText = this.props.privacy !== 'unlisted' ? intl.formatMessage(messages.publishLoud, { publish: intl.formatMessage(messages.publish) }) : intl.formatMessage(messages.publish);
		}
		
		let style = document.createElement("style");
			style.textContent = [
				'#utilBtn {',
				'	Padding-Top: 10px;',
				'}',
				'',
				'#utilBtn > * {',
				'	Margin-Bottom: 1em;',
				'}',
				'',
				'#utilBtn__tokenHolder {',
				'	Display: Flex;',
				'}',
				'',
				'#utilBtn__tokenHolder__input--accessToken {',
				'	Flex: 1;',
				'}'
			].join("\r\n");
			
		document.head.appendChild(style);

		return (
			<div className='compose-form'>
				<WarningContainer />

				<Collapsable isVisible={this.props.spoiler} fullHeight={50}>
					<div className='spoiler-input'>
						<label>
							<span style={{ display: 'none' }}>{intl.formatMessage(messages.spoiler_placeholder)}</span>
							<input placeholder={intl.formatMessage(messages.spoiler_placeholder)} value={this.props.spoiler_text} onChange={this.handleChangeSpoilerText} onKeyDown={this.handleKeyDown} type='text' className='spoiler-input__input'  id='cw-spoiler-input' />
						</label>
					</div>
				</Collapsable>

				<ReplyIndicatorContainer />

				<div className='compose-form__autosuggest-wrapper'>
					<AutosuggestTextarea
						ref={this.setAutosuggestTextarea}
						placeholder={intl.formatMessage(messages.placeholder)}
						disabled={disabled}
						value={this.props.text}
						onChange={this.handleChange}
						suggestions={this.props.suggestions}
						onKeyDown={this.handleKeyDown}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						onSuggestionSelected={this.onSuggestionSelected}
						onPaste={onPaste}
						autoFocus={!showSearch && !isMobile(window.innerWidth)}
					/>

					<EmojiPickerDropdown onPickEmoji={this.handleEmojiPick} />
				</div>

				<div className='compose-form__modifiers'>
					<UploadFormContainer />
				</div>

				<div className='compose-form__buttons-wrapper'>
					<div className='compose-form__buttons'>
						<UploadButtonContainer />
						<PrivacyDropdownContainer />
						<SensitiveButtonContainer />
						<SpoilerButtonContainer />
					</div>
					<div className='character-counter__wrapper'><CharacterCounter max={500} text={text} /></div>
				</div>

				<div className='compose-form__publish'>
					<div className='compose-form__publish-button-wrapper'><Button text={publishText} onClick={this.handleSubmit} disabled={disabled || this.props.is_uploading || length(text) > 500 || (text.length !== 0 && text.trim().length === 0)} block /></div>
				</div>

				<div id="utilBtn">
					<div id="utilBtn__tokenHolder">
						<input id="utilBtn__tokenHolder__input--accessToken" class="search__input" type="Text" value="" placeholder="アクセストークン" />
						<button id="utilBtn__tokenHolder__button--auth" class="button utilBtn__button" onClick={ComposeForm.UtilBtns.saveToken}>認証</button>
					</div>
					
					<button id="utilBtn__button--goji" class="button button--block utilBtn__button" onClick={ComposeForm.UtilBtns.dispatchGoji}>ｺﾞｼﾞﾓﾘｨｨｨｨｨｨ!!!</button>
					<button id="utilBtn__button--harukin" class="button button--block utilBtn__button" onClick={ComposeForm.UtilBtns.dispatchHarukin}>はるきん焼却</button>
					<button id="utilBtn__button--tootRate" class="button button--block utilBtn__button" onClick={ComposeForm.UtilBtns.dispatchTootRate}>トゥート率投稿</button>
				</div>
			</div>
		);
	}
}