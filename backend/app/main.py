from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
from dotenv import load_dotenv
from pydantic import BaseModel
import os

load_dotenv()

app = FastAPI()

supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

class Item(BaseModel):
    name: str
    description: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the ProductPoker API"}

@app.post("/items/")
def create_item(item: Item):
    try:
        response = supabase.table("items").insert(item.dict()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/items/")
def read_items():
    try:
        response = supabase.table("items").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/items/{item_id}")
def read_item(item_id: int):
    try:
        response = supabase.table("items").select("*").eq("id", item_id).execute()
        if len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    try:
        response = supabase.table("items").update(item.dict()).eq("id", item_id).execute()
        if len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    try:
        response = supabase.table("items").delete().eq("id", item_id).execute()
        if len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)