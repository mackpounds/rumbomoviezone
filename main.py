import os
from WEBSITE_PACKAGE import create_app

app = create_app()

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    app.run(host=host, port=port, debug=os.getenv("DEBUG", "FALSE" == "TRUE"))