import { useState, useEffect } from "react";

const useCountdown = ({ timeInMilliSeconds, countDownStarted, countDownTime }) => {

    const [countDownInMilliSeconds, setCountDown] = useState(countDownTime - new Date().getTime());

    useEffect(() => {
        let interval
        if (timeInMilliSeconds > 0) {
            interval = setInterval(() => {
                setCountDown(countDownTime - new Date().getTime());
            }, 1000);

            return () => clearInterval(interval);
        } else if (!countDownStarted) {
            clearInterval(interval);
        }
    }, [countDownTime, timeInMilliSeconds, countDownStarted]);


    // reset countDownInMilliSeconds to zero
    // if countdown stopped
    useEffect(() => {
        if (!countDownStarted) { setCountDown(0); return }
    }, [countDownStarted])

    return getReturnValues(countDownInMilliSeconds);
};


const getReturnValues = (countDown) => {
    // calculate the time left
    var minutes = Math.floor(countDown / (60 * 1000));
    var seconds = parseInt(((countDown % (60 * 1000)) / 1000).toFixed(0));
    return [minutes, seconds];
};

export { useCountdown };
