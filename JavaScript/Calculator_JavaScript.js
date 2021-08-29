/**This code creates an object to keep track of values */
const Calculator = {
    //this code displays 0 on the screen
    Display_Value: '0',
    /**This code will hold the first operand for any expressions,
     *  we set it to nuull for now*/
    First_Operand: null,
    /**This code checks whether or not the second operand has been input */
    Wait_Second_Operand: false,
    /**This code will hold the operator,
     * we set it to null for now
     */
    operator: null,
};

/**This code modifies values each time a button is clicked */
function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand} = Calculator;
    /**In this code, we are checking to see if Wait_Second_Operand is true and set
     * Display_Value to the key that was clicked
     */
    if (Wait_Second_Operand === true){
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    }else {
        /**This code overwrites Display_Value if the current value is 0
         * otherwise it adds onto it
         */
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

/**This section of code handles decimal points */
function Input_Decimal(dot) {
    /**This code ensures that accifental clicking of the decimal point
     * don't cause bugs in the operation
     */
    if (Calculator.Wait_Second_Operand === true) return;
    if (Calculator.Display_Value.includes(dot)){
        //In this code we are saying that if the Display_Value does cojntain a decimal point
        //we want to add a decimal point
        Calculator.Display_Value += dot;
    }
}

/**This code conmtains functions that handle operators */
function Handle_Operator(Next_Operator) {
    const {First_Operand, Display_Value, operator} = Calculator
    /**Whe an operator key is pressed, we convert the current number
     * displayed on the screen to an number and then store the result in
     * Calculator.First_Operand if it doesn't already exist
     */
    const Value_of_Input = parseFloat(Display_Value);
    /**Checks is an operator already exists and if Wait_Second_Operand is true,
     * then updates the operator and exits from the function
     */
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {//checks if an iperator already exists}
        const Value_Now = First_Operand || 0;
        /**If operator exists, property lookup is preformed for the operator
         * in the Perform_Calculation object and the function that matches the
         * operator is excecuted
         */
        let result = Perform_Calculation[operator]{Value_Now, Value_of_Input};
        /**Here we add a fixed amount of numbers after the decimal */
        result = Number(result).toFixed(9)
        /**This will remove any trailing 0's */
        result = (result * 1).toString()
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
}
Calculator.Wait_Second_Operand = true;
Calculator.operator = Next_Operator;

/**This code defines the Perfom_Calculation function */
const Perfom_Calculation = {
    '/':(First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*':(First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+':(First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-':(First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=':(First_Operand, Second_Operand) => Second_Operand,
};

function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

/**This function updates the screen with the contesnt of Display_Value */
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

/**This code updates the display based on button click input */
Update_Display();
//This section monitors button clicks
const keys = document.querySelector('calculator-keys');
keys.addEventListener('click', (event) => {
    /**the target variable is an object that represents the element 
     * that was clicked
     */
    const { target } = event;
    //if the element that was clicked on was not a button, exit the function.
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    //ensures that AC clears the numbers from the calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})