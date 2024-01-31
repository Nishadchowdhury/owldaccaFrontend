import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return <div className="timer">Reloading...</div>;
    }

    return (
        <div className="timer">
            <div className="animate-bounce lg:text-6xl text-3xl">{remainingTime}</div>
        </div>
    );
};


function NetworkIssueModal({ visible }) {
    if (!visible) return null;

    function reloadWindow() {
        window.location.reload();
    }


    return (
        <div className="fixed  inset-0 z-[200] text-white transition-all bg-background bg-opacity-75 backdrop-blur-md center flex-col" >

            <div className="animate-pulse center flex-col lg:flex-row lg:text-2xl text-base text-center " >
                <span className="lg:inline-block block text-secondary mr-2 text-2xl " >OOPS! </span> It seems like you're experiencing some network issues, <br className="md:hidden block " /> please wait a while.
            </div>


            <div className="center flex-col lg:flex-row lg:text-2xl text-base text-center mt-10 " >
                <div className="hidden md:block">
                    <CountdownCircleTimer

                        isPlaying
                        duration={10}
                        colors={["#DE7230", "#00FFFF", "#DE7230", "#00FFFF", "#DE7230", "#00FFFF"]}
                        colorsTime={[10, 9, 7, 5, 3, 0]}
                        onComplete={reloadWindow}
                        trailColor={'#aaa'}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>

                <div className="md:hidden block" >
                    <CountdownCircleTimer

                        isPlaying
                        duration={10}
                        colors={["#DE7230", "#00FFFF", "#DE7230", "#00FFFF", "#DE7230", "#00FFFF"]}
                        colorsTime={[10, 9, 7, 5, 3, 0]}
                        onComplete={reloadWindow}
                        trailColor={'#aaa'}
                        size={120}
                        strokeWidth={8}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
            </div>


        </div>
    )
}
export default NetworkIssueModal;

