/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  people = data;
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return app.stop();
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  return personInfo;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
///////////////////////////////// Search By Traits Section //////////////////////////////////////////////////
//-----------------------------????-----------????------------????-----------------------------------------------//

// \/\/\/ SearchByTraits \/\/\/ --- Calls traitPrompts() and Displaying People Based On Trait Input//////////
function searchByTraits(people) {
  let peopleFound = peopleByTrait(people);
  while (true)
    if (!peopleFound[0]) {
      alert("Could not find that individual. \n\nPlease start over!");
      return searchByTraits(people);
    } else if (peopleFound[0] && !peopleFound[1]) {
      people = data;
      mainMenu(peopleFound, people);
    } else {
      people = peopleFound;
      displayPeople(people);
      return searchByTraits(people);
    }
}

// \/\/\/ TraitPrompts \/\/\/ --- Includes Prompts For TraitName and TraitsValue, Returns Array With Prompt Inputs//
function traitPrompt() {
  let traits = [];
  let traitInput = prompt(
    "Please enter trait type\nPossible trait type: gender, dob, height, weight, eyecolor, occupation".trim()
  );
  if (traitInput === null) {
    return stop();
  }
  if (
    traitInput !== "gender" &&
    traitInput !== "dob" &&
    traitInput !== "height" &&
    traitInput !== "weight" &&
    traitInput !== "eyecolor" &&
    traitInput !== "occupation".trim()
  ) {
    alert(`${traitInput} is not a valid trait! Please enter a valid trait`);
    return traitPrompt();
  }
  if (traitInput === "eyecolor") {
    traitInput = "eyeColor";
    traits.push(traitInput);
  } else if (traitInput == "") {
    return traitPrompt();
  } else {
    traits.push(traitInput);
  }
  if (traitInput == "dob") {
    alert("For DOB input, please format as M/D/YYYY");
    let traitValuePrompt = prompt(
      `Exapmle: 2/16/1940 or 12/12/1940 or 12/6/1940\n\nPlease enter value for ${traitInput.toLowerCase()}`
    );
    traits.push(traitValuePrompt);
  } else {
    let traitValuePrompt = prompt(
      `Please enter value for ${traitInput.toLowerCase()}`
    );
    traits.push(traitValuePrompt);
  }
  return traits;
}

// \/\/\/ PeopleByTrait \/\/\/ --- Filtering People By Trait and Returns Them as Array of Objects////////////
function peopleByTrait(people) {
  let trait = traitPrompt();
  let personsArray = people.filter(function (person) {
    return person[trait[0]] == trait[1];
  });
  return personsArray;
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
///////////////////////////////// Person Family Section /////////////////////////////////////////////////////
//-----------------------------????----------????----------????--------------------------------------------------//

// \/\/\/ FindPersonFamily \/\/\/ --- Calls displayPersonFamily() and Returns It As Interpolated String /////
function findPersonFamily(personFound, people) {
  let personFamily = displayPersonFamily(personFound, people);
  return personFamily;
}

// \/\/\/ DisplayPersonFamily \/\/\/ --- Collects All Family Members and Returns Interpolated String ////////
function displayPersonFamily(personFound, people) {
  let spouse = findPersonSpouse(personFound, people);
  let parents = findPersonParents(personFound, people);
  let siblings = findPersonSibling(personFound, people);
  return `${spouse}\n${parents}\n${siblings}`;
}

// \/\/\/ FindPersonSpouse \/\/\/ --- Filtering People Array to Find Person Spouse //////////////////////////
function findPersonSpouse(personFound, people) {
  let spouseFound = people.filter(function (person) {
    if (personFound.currentSpouse == person.id) {
      return true;
    }
  });
  let spouse = spouseDictionary(spouseFound);
  return spouse;
}

// \/\/\/ SpouseDictionary \/\/\/ --- Returns spouseString as Interpolated String of Spouse Full Name //////
function spouseDictionary(spouse) {
  if (spouse[0]) {
    let spouseString = "Spouse: ";
    spouseString += `${spouse[0].firstName} ${spouse[0].lastName}`;
    return spouseString;
  } else if (!spouse[0]) {
    let spouseString = "Spouse: None";
    return spouseString;
  }
}

// \/\/\/ FindPersonParents \/\/\/ --- Filtering People Array to Find Person Parents ///////////////////////
function findPersonParents(personFound, people) {
  let foundParents = people.filter(function (person) {
    if (personFound.parents.includes(person.id)) return true;
  });
  let parents = parentsDictionary(foundParents);
  return parents;
}

// \/\/\/ ParentsDictionary \/\/\/ --- Returns parentsString as Interpolated String of Parents Full Names //
function parentsDictionary(parents) {
  if (parents[0] && parents[1]) {
    let parentsString = "Parents: ";
    parentsString += `${parents[0].firstName} ${parents[0].lastName}; ${parents[1].firstName} ${parents[1].lastName}`;
    return parentsString;
  } else if (!parents[0]) {
    let parentsString = "Parents: None";
    return parentsString;
  } else if (parents[0] && !parents[1]) {
    let parentsString = "Parent: ";
    parentsString += `${parents[0].firstName} ${parents[0].lastName}`;
    return parentsString;
  }
}

// \/\/\/ FindPersonSiblings \/\/\/ --- Filtering People Array to Find Person Siblings ///////////////////////
function findPersonSibling(personFound, people) {
  let foundSiblings = people.filter(function (person) {
    if (
      (person.parents.includes(personFound.parents[0]) &&
        personFound.id !== person.id) ||
      (person.parents.includes(personFound.parents[1]) &&
        personFound.id !== person.id)
    )
      return true;
  });
  let siblings = siblingDictionary(foundSiblings);
  return siblings;
}

// \/\/\/ SiblingsDictionary \/\/\/ --- Returns siblingsString as Interpolated String of Siblings Full Names //
function siblingDictionary(siblings) {
  let siblingsArray = [];
  if (!siblings[0]) {
    let siblingsString = "Siblings: None";
    return siblingsString;
  } else {
    siblingsArray = siblings.map(function (person) {
      return ` ${person.firstName} ${person.lastName}`;
    });
    let siblingsString = "Sibling(s): ";
    siblingsString += siblingsArray;
    return siblingsString;
  }
}

// \/\/\/ FindPersonDescendants \/\/\/ --- Returns personDescendants as String of Their Full Names  ///////////////////////
function findPersonDescendants(personFound, people) {
  let descentandsFound = descendantsFilterFunction(personFound, people);
  let descendants = descendantsDictionary(descentandsFound);
  return descendants;
}

// \/\/\/ DescendantsFilterFunction \/\/\/ --- Filtering People Array to Find Person Descendants ///////////////////////
function descendantsFilterFunction(personFound, people) {
  if (!personFound[1]) {
    let descendantsFound = people.filter(function (person) {
      if (person.parents.includes(personFound.id)) {
        return true;
      }
    });
    personFound = descendantsFound;
    if (personFound[0]) {
      return descendantsFilterFunction(personFound, people);
    }
  } else if (personFound[1]) {
    for (let i = 0; i < personFound.length; i++) {
      people.filter(function (person) {
        if (person.parents.includes(personFound[i].id)) {
          personFound.push(person);
          return true;
        }
      });
    }
  }
  return personFound;
}
// \/\/\/ DescendantsDictionary \/\/\/ --- Returns descendantsString as Interpolated String of Descendants Full Names //
function descendantsDictionary(descendants) {
  if (!descendants[0]) {
    let descendantsString = "Descendants: None";
    return descendantsString;
  } else {
    let descendantsArray = descendants.map(function (person) {
      return ` ${person.firstName} ${person.lastName}`;
    });
    let descendantsString = "Descendant(s): ";
    descendantsString += descendantsArray;
    return descendantsString;
  }
}
