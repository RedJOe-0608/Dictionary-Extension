const renderDetails = () => {
  const form = document.querySelector("form");

  let result1 = "";
  let result2 = "";
  let result3 = "";
  let audio = "";
  let error = "";
  let responseAudio = "";
  let synonyms = "";
  let countExample = 1;

  const renderSubmit = async (e) => {
    e.preventDefault();
    const searchWord = form.word.value;

    const response1 = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
    );
    const response2 = await fetch(
      `https://words.bighugelabs.com/api/2/3e3693e42d1d633b41c21933ab11d3ac/${searchWord}/json`
    );
    // if (response2.ok) {
    //   console.log("SUCCESS");

    //   // let SynAndAntArray = [];
    //   // let synArray = [];
    //   // let simArray = [];
    //   // const data2 = await response2.json();
    //   // console.log(data2);
    //   // SynAndAntArray = Object.entries(data2);
    //   // console.log(SynAndAntArray);
    // } else {
    //   console.log("failure");
    // }
    result1 = ``;
    result2 = ``;
    audio = "";
    let count = 1;
    let value = true;
    // let SynAndAntArray = [];
    // let synArray = [];
    // let simArray = [];
    const data1 = await response1.json();
    console.log(data1);
    // const data2 = await response2.json();
    // console.log(data2);
    // SynAndAntArray = Object.entries(data2);
    // console.log(SynAndAntArray);

    //To search

    if (data1.title === "No Definitions Found") {
      document.querySelector(".result1").innerHTML = "";
      document.querySelector(".result-audio").innerHTML = "";
      document.querySelector(".result2").innerHTML = "";
      document.querySelector(".result3").innerHTML = "";

      error += `
  <div class="error">
  <h3>Sorry, search result not found :(
   Please head to the web instead.</h3>
  </div>
  `;
      document.querySelector(".error-display").innerHTML = error;
      error = ``;
    } else {
      document.querySelector(".error-display").innerHTML = "";
      error = ``;
      audio = "";
      data1.forEach((search) => {
        search.meanings[0].definitions.forEach((definition) => {
          if (count > 1) {
            result1 += `
            <div class="word-definition">
            <h4>Definition ${count}</h4>
            ${definition.definition}</div>`;
            //   console.log(result);
            count++;
          } else {
            result1 += `
            <div class="word-definition">
            <h4>Definition</h4>
            ${definition.definition}</div>`;
            //   console.log(result);
            count++;
          }
        });
        audio = "";
        search.phonetics.forEach((audiofile) => {
          console.log(audiofile.audio);

          if (audiofile.audio !== "") {
            if (audio === "") {
              audio = audiofile.audio;
              responseAudio = `
      <div class="audio"> 
      <h4>Pronounciation</h4> 
      <audio controls preload="none">
    <source src=${audio} type="audio/mp3">
    <audio>
    </div>
    `;

              console.log(audio);
            }
          }
        });
        console.log(audio);

        search.meanings.forEach((meaning) => {
          meaning.definitions.forEach((definition) => {
            if (definition.example != undefined) {
              result2 += `
        <div class="word-example">
         
        <h4>Example ${countExample}</h4>
        ${definition.example}
        </div> `;
              countExample++;
            }
          });
        });
      });
      // <div class="word-example"></div>
      countExample = 1;

      document.querySelector(".result1").innerHTML = result1;
      document.querySelector(".result-audio").innerHTML = responseAudio;
      audio = "";
      document.querySelector(".result2").innerHTML = result2;
      //---------------------------------------------------------------------------------

      if (response2.ok) {
        console.log("SUCCESS");

        let SynAndAntArray = [];
        let synArray = [];
        let simArray = [];
        const data2 = await response2.json();
        console.log(data2);
        SynAndAntArray = Object.entries(data2);
        console.log(SynAndAntArray);

        SynAndAntArray.forEach((elements) => {
          synArray = [];
          simArray = [];
          // console.log(...elements[1].syn);
          if (elements[1].syn != undefined) {
            synArray = [...elements[1].syn];
          }
          if (elements[1].sim != undefined) {
            simArray = [...elements[1].sim];
          }
          synArray.push(...simArray);
          // console.log(synArray);
          for (i = 0; i < synArray.length; i++) {
            synonyms += ` ${synArray[i]},`;
          }
          result3 = `
    <div class="synonyms">
    <h4>Synonyms</h4>
    ${synonyms}
    </div>
    `;
        });
        // console.log(result3);
        document.querySelector(".result3").innerHTML = result3;
        synonyms = ``;
      } else {
        console.log("failure");
        document.querySelector(".result3").innerHTML = "";
      }

      //   SynAndAntArray.forEach((elements) => {
      //     synArray = [];
      //     simArray = [];
      //     // console.log(...elements[1].syn);
      //     if (elements[1].syn != undefined) {
      //       synArray = [...elements[1].syn];
      //     }
      //     if (elements[1].sim != undefined) {
      //       simArray = [...elements[1].sim];
      //     }
      //     synArray.push(...simArray);
      //     // console.log(synArray);
      //     for (i = 0; i < synArray.length; i++) {
      //       synonyms += ` ${synArray[i]},`;
      //     }
      //     result3 = `
      // <div class="synonyms">
      // <h4>Synonyms</h4>
      // ${synonyms}
      // </div>
      // `;
      //   });
      //   // console.log(result3);
      //   document.querySelector(".result3").innerHTML = result3;
      //   synonyms = ``;
    }
  };

  form.addEventListener("submit", renderSubmit);
};
window.addEventListener("DOMContentLoaded", () => renderDetails());
