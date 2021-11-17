

export class InputFilter {


    instanceBoundInput;
    delimitedArray;
    filteredDelimitedArray;
    // define regex test patterns as class fields, bound to the constructor
    isNotSingleSpaceOrCommaCharacter;
    isNotSingleOrDoubleQuoteCharacter;
    constructor(input) {
        ({instanceBoundInput: this.instanceBoundInput} = input);

        ({delimitedArray: this.delimitedArray} = this);
        ({filteredDelimitedArray: this.filteredDelimitedArray} = this);

        ({isNotSingleSpaceOrCommaCharacter: this.isNotSingleSpaceOrCommaCharacter} = /([^\s])([^,])$/);
        ({isNotSingleOrDoubleQuoteCharacter: this.isNotSingleOrDoubleQuoteCharacter} = /([^'])([^"])$/);

        ({createDelimitedArray: this.createDelimitedArray} = this);
        ({filterSingleAndDoubleQuoteValues: this.filterSingleAndDoubleQuoteValues} = this);
    }

    createDelimitedArray = async ()=> {
        this.delimitedArray = await this.isNotSingleSpaceOrCommaCharacter.exec(this.instanceBoundInput)[0];
    }
    filterSingleAndDoubleQuoteValues = async ()=> {
        await this.createDelimitedArray();
        await this.delimitedArray.forEach(item => {
            // iterate over phrase array, remove quotes from phrases that have them; return filteredDelimitedArray
           const phraseToCheck = item.toString();
           this.isNotSingleOrDoubleQuoteCharacter.test(phraseToCheck) ?
               this.filteredDelimitedArray.push(phraseToCheck) :
                    // assumes first and last elements of character array contain undesired values
                    this.filteredDelimitedArray.push(phraseToCheck.shift().pop());
        });
        return this.filteredDelimitedArray;
    }

}

module.exports.InputFilter = InputFilter;