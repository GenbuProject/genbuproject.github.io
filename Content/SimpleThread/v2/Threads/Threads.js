window.addEventListener("DOMContentLoaded", () => {
	DOM("@Div.Thread_Searcher").forEach((searcher) => {
		let rnd = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16);

		searcher.id = "Thread_Searcher_" + rnd,
		searcher.querySelector("Label.Thread_Searcher_Label").id = "Thread_Searcher_Label_" + rnd,
		searcher.querySelector("Div.Thread_Searcher_Container").id = "Thread_Searcher_Container_" + rnd,
		searcher.querySelector("Input.Thread_Searcher_Container_Input").id = "Thread_Searcher_Container_Input_" + rnd,
		searcher.querySelector("Label.Thread_Searcher_Container_Label").id = "Thread_Searcher_Container_Label_" + rnd;

		searcher.querySelector("Label.Thread_Searcher_Label").htmlFor = searcher.querySelector("Input.Thread_Searcher_Container_Input").id,
		searcher.querySelector("Label.Thread_Searcher_Container_Label").htmlFor = searcher.querySelector("Input.Thread_Searcher_Container_Input").id;
	});
});