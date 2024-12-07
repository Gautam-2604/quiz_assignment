import openai

openai.api_key = "your-openai-api-key"

async def generate_question():
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o",
            messages=[{
                "role": "system",
                "content": "Create a multiple-choice question with 4 options and specify the correct answer."
            }]
        )
        question_text = response.choices[0].message.content
        return question_text
    except Exception as e:
        print(f"Error generating question: {e}")
        return (
            "What is the capital of France?\n"
            "A. London\nB. Berlin\nC. Paris\nD. Rome\nCorrect Answer: C"
        )
