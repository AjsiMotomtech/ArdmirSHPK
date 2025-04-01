import os
import pymupdf as fitz  # PyMuPDF

def extract_images(pdf_path, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Open the PDF
    pdf_document = fitz.open(pdf_path)
    
    # Initialize image counter
    image_count = 0
    
    # Iterate through each page
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        
        # Get images from the page
        image_list = page.get_images(full=True)
        
        # Process each image
        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Save the image
            with open(f"{output_dir}/image_{image_count}.{image_ext}", "wb") as image_file:
                image_file.write(image_bytes)
                print(f"Saved image {image_count} from page {page_num + 1}")
            
            image_count += 1
    
    print(f"Total images extracted: {image_count}")
    pdf_document.close()

# Extract images from the PDF
pdf_path = "attached_assets/CV ARDMIR shpk.pdf"
output_dir = "public/images/ardmir"
extract_images(pdf_path, output_dir)