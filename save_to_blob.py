import os
from azure.storage.blob import BlobServiceClient
from datetime import datetime
from dotenv import load_dotenv


class WriteToBlob:

    def __init__(self, blob_connection: str, container:str):
        """

        :param container: The container in the Blob Storage to upload files to.
        :param blob_connection: The connection string for the Blob Service.
        """
        self.now = datetime.now().strftime("%Y%m%d")
        # Create a BlobServiceClient using the provided connection string
        self.blob_service_client = BlobServiceClient.from_connection_string(blob_connection)
        self.container = container

    def write_folder_to_blob(self,
                             look_at_folder: str,
                             file_type: str):
        """
        Uploads files from a specified folder to Azure Blob Storage.

        :param look_at_folder: The folder path containing the files to be uploaded.
        :param file_type: The file type to filter files by (e.g., 'txt', 'csv').
        :return: None
        """
        # Print a message indicating the start of the upload process
        print(f"Uploading files from: {look_at_folder}")

        # List all files in the specified folder
        files = os.listdir(look_at_folder)

        # Initialize a list to store the names of successfully uploaded blobs
        upload_blobs = []

        # Iterate through each file in the folder
        for file in files:
            # Check if the file has the specified file type
            if file.endswith(f".{file_type}"):
                # Construct the full path to the file
                file_path = os.path.join(look_at_folder, file)

                # Generate a unique blob name using the current timestamp
                blob_name = f"playwright/raw/{look_at_folder}/{self.now}_{file}"

                # Get the BlobClient for the specified container and blob name
                blob_client = self.blob_service_client.get_blob_client(container=self.container,
                                                                       blob=blob_name)

                # Upload the file to Azure Blob Storage
                with open(file_path, "rb") as data:
                    blob_client.upload_blob(data, overwrite=True)

                    # Add the uploaded blob name to the list
                    upload_blobs.append(blob_name)

        # Print the names of the successfully uploaded blobs
        print(f"Files uploaded: {upload_blobs}")


if __name__ == "__main__":
    container = 'data-etl-dev'
    load_dotenv()
    wtb = WriteToBlob(os.environ['BLOB_CONNECTION'], container)
    wtb.write_folder_to_blob("allure-report/widgets", 'json')

    