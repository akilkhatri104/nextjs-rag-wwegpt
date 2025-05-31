import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        "Who is the current WWE Undisputed Champion?",
        "Who is the current WWE Men's United States Champion?   ",
    ];
    return (
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton
                    text={prompt}
                    key={`suggestion-${index}`}
                    onClick={() => onPromptClick(prompt)}
                />
            ))}
        </div>
    );
};

export default PromptSuggestionRow;
