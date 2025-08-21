"use client";
import Logo from "./components/Logo";
import { useChat } from "ai/react";
import { Message } from "ai";
import Bubble from "./components/Bubble";
import PromptSuggestionRow from "./components/PromptSuggestionRow";
import LoadingBubble from "./components/LoadingBubble";

const Home = () => {
    const {
        input,
        handleInputChange,
        handleSubmit,
        status,
        messages,
        append,
    } = useChat();
    const noMessages = !messages || messages.length === 0;

    const handlePrompt = (promptText) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText ,
            role: 'user'
        }
        append(msg)
    }

    return (
        <main>
            <h2 style={{ fontSize: '16px', color: 'gray' }}>Database may take 2-3 minutes to start due to inactivity</h2>
            <Logo />
            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            The ultimate place for WWE fans. Ask WWEGPT anything
                            about the WWE Pro Wrestling and it will come back
                            with the most up-to-date answers. We hope you enjoy!
                        </p>
                        <br />
                        <PromptSuggestionRow onPromptClick={handlePrompt} />
                    </>
                ) : (
                    <>
                        {messages.map((message,index) => <Bubble key={`message-${index}`} message={message} /> )}
                        {status === 'submitted' && <LoadingBubble />}
                    </>
                )}
            </section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="question-box"
                    onChange={handleInputChange}
                    value={input}
                    placeholder="ask me something..."
                />
                <input type="submit" value='Submit' />
            </form>
        </main>
    );
};

export default Home;
