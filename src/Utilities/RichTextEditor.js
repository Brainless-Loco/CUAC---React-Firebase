import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ImageUploader from './ImageUploader';

const RichTextEditor = (props) => {
    const editorRef = useRef();

    return (
        <div>
            <Editor
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                    props.onEditorInit(editorRef);
                }}
                apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                height: 512,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks image code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic underline backcolor | image link | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                automatic_uploads: false,
                images_upload_handler: ImageUploader,
                file_picker_types: 'image',
                file_picker_callback: (cb, value, meta) => {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                    */

                    input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                        */
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache =  editorRef.current.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                    };

                    input.click();
                }
                }}
            /> 
        </div>
    );
}

export default RichTextEditor;