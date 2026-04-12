import chromadb
from chromadb.utils import embedding_functions

client = chromadb.CloudClient(
  api_key='ck-5iKqEkaETKFin3xTbDzMoYAQqRa7reVoeSF73iGRmvd4',
  tenant='975bd500-e84c-4771-9c6e-2669f5f9964d',
  database='LibraryDB'
)

# Use a lightweight, fast model for embeddings
default_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

# Create or Get the collection
collection = client.get_or_create_collection(name="library_catalog", embedding_function=default_ef)

def add_book_to_vector_db(book_id: int, text: str, metadata: dict):
    """Indexes a book's description into the vector space."""
    collection.add(
        ids=[str(book_id)],
        documents=[text],
        metadatas=[metadata]
    )

def semantic_search_books(query: str, n_results: int = 5):
    """Returns book IDs that are 'conceptually' close to the query."""
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    # Return the IDs of the matching books
    return results['ids']