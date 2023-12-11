import os
from azure.storage.blob import BlobServiceClient
from datetime import datetime
from dotenv import load_dotenv

NOW = datetime.now().strftime("%Y%m%d")


def write_file_to_blob(container: str,
                       look_at_folder: str,
                       con_str: str,
                       file_type: str,
                       save_folder: str):
    """
    This write a file to blob storage
    :return:
    """
    print(f"Uploading the file from: {look_at_folder}")
    blob_service_client = BlobServiceClient.from_connection_string(con_str)
    files = os.listdir(look_at_folder)
    upload_blobs = []
    for file in files:
        if file.endswith(f".{file_type}"):
            file_path = os.path.join(look_at_folder, file)
            # blob_name = f"playwright/raw/{save_folder}/{NOW}_{file}"
            blob_name = f"playwright/raw/{look_at_folder}/{NOW}_{file}"
            blob_client = blob_service_client.get_blob_client(container=container, blob=blob_name)
            with open(file_path, "rb") as data:
                blob_client.upload_blob(data, overwrite=True)
                upload_blobs.append(blob_name)

    print(f"Files upload : {upload_blobs}")


if __name__ == "__main__":
    container = 'data-etl'
    look_at_folder = "allure-results"
    load_dotenv()
    con_str = "DefaultEndpointsProtocol=https;AccountName=lanternappsadataprod;AccountKey=20QvCVyKYBenhC+1yw1yr5RZFwVnj4c+XlPNCBzKkKASqQn1iNKuU0u0iwcgew1I6bNX6HJHrbZz+ASteT8lmw==;EndpointSuffix=core.windows.net"
    con_str = os.environ['blob_connection']
    write_file_to_blob(container, "widgets", con_str, 'json', 'widgets')


