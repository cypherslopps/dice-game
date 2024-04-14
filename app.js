const UIController = (() => {
    const DOM = {
        rollDiceButton: document.querySelector(".roll"),
        diceCardImages: Array.from(document.querySelectorAll(".dice-card img")),
        notification: document.querySelector(".notification")
    }

    const state = {
        initialized: false,
        count: 4
    };

    const randomize = () => {
        const randomInt = Math.floor(Math.random() * 6) + 1;
        return randomInt;
    };

    return {
        getDom: () => DOM,
        rollDice: function() {
            if (!state.initialized) {
                state.initialized = true;

                // Notify user
                DOM.notification.innerHTML = "Playing";

                let count = 0;
                let interval = setInterval(roll, 500);

                function roll() {
                    count++;
                    const dice1 = randomize();
                    const dice2 = randomize();

                    if (count === state.count) {
                        clearInterval(interval);
                        state.initialized = false;

                        // Notify user
                        if (dice1 === 6 && dice2 === 6) {
                            DOM.notification.innerHTML = "Winner";
                        } else {
                            DOM.notification.innerHTML = "You lost";
                        }
                    }

                    const [dice1Image, dice2Image] = DOM.diceCardImages;
                    
                    dice1Image.src = `dice-${dice1}.png`;
                    dice2Image.src = `dice-${dice2}.png`;
                }
            } 
        }
    }
})();

const Controller = ((uiCtrl) => {
    function setListeners() {
        const DOM = uiCtrl.getDom();

        DOM.rollDiceButton.addEventListener("click", uiCtrl.rollDice);
    }

    return {
        init: () => {
            setListeners();
        }
    }
})(UIController);

Controller.init();