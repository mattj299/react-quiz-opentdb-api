// This functions gets used in FormPopup and has a file because it shortens FormPopup / has less confusion on what's happening
async function organizedData(data, responseCode) {
  // Put data into an array with each being an object of it's question, answers, and answerUsingIndex
  const organizedData = [];
  data.map((item) => {
    // Function shuffles the array so answer is not always the 4th option
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // swap elements array[i] and array[j] using destructuring syntax
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    const codedQuestion = item.question;
    // Decodes the questions with a parser so instead of returning html code for special characters it returns the normal characters
    const parser = new DOMParser();
    const question = parser.parseFromString(codedQuestion, "text/html").body
      .textContent;

    // Get correct & incorrect answers, put into array, shuffle, change to normal characters instead of html special characters with parser
    const incorrectAnswers = item.incorrect_answers;
    const correctAnswer = item.correct_answer;
    const allAnswers = [...incorrectAnswers, correctAnswer];
    shuffle(allAnswers);
    const answers = allAnswers.map((answer) => {
      return parser.parseFromString(answer, "text/html").body.textContent;
    });

    // Use findIndex after shuffle to get index of correct answer to pass as anserUsingIndex
    const answerUsingIndex = allAnswers.findIndex(
      (answer) => answer === correctAnswer
    );

    // Create object and push into organizedData array, returning dataItem does nothing but take off warning in console
    const dataItem = {
      question,
      answers,
      answerUsingIndex,
    };
    organizedData.push(dataItem);
    return dataItem;
  });

  // returns array full of objects (^like dataItem being returned above) and responseCode number
  return { organizedData, responseCode };
}

export default organizedData;
