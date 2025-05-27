import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.PersistentClient(path="./chromadb")
collection = client.get_collection("reddit_posts")

def query_chroma(question, top_k=5):
    query_embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        print(f"\n📘 Course: {meta['course']}\n🔗 {meta['url']}\n---\n{doc[:500]}...\n")

# Example usage
if __name__ == "__main__":
    user_question = input("Ask about a course (e.g., 'Is CS540 hard?'):\n> ")
    query_chroma(user_question)
