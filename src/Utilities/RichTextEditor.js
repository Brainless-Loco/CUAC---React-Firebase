import React from 'react';
import './RichEditor.css';
import { EditorState, getDefaultKeyBinding, RichUtils, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import { Strings } from './Constants';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty(), linkInput: ''};

        this.insertImageRef = React.createRef();
        this.editorRef = React.createRef();
        this.insertLinkRef = React.createRef();
        this.insertLinkInputRef = React.createRef();

        this.focus = () => this.editorRef.current.focus();
        this.onChange = (editorState) => this.setState({editorState: editorState, linkInput: ''});

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.handleInsertImageButton = this._handleInsertImageButton.bind(this);
        this.handleInsertLinkButton = this._handleInsertLinkButton.bind(this);
    }

    _handleInsertImageButton(event) {
        console.log('Add image');
        let img = null;

        if(event.target.files && event.target.files[0]) {
            img = event.target.files[0];
        }

        if(img == null) {
            console.log('Error parsing file or no file was selected.');
            return;
        }


        const newEditorState = this._insertImage(this.state.editorState, URL.createObjectURL(img));
        this.setState({editorState: newEditorState});
    }

    _insertImage = (editorState, imageURL) => {
        const currentContent = editorState.getCurrentContent();
        const contentStateWithEntity = currentContent.createEntity(
            "image",
            "IMMUTABLE",
            { src: imageURL }
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
        });
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ` ${imageURL} `);
    }

    _handleInsertLinkButton() {
        this.insertLinkRef.current.hidden = true;
        const newEditorState = this._insertImageLink(this.state.editorState, this.state.linkInput);
        this.setState({editorState: newEditorState});
    }

    _insertImageLink = (editorState, imageURL) => {
        const currentContent = editorState.getCurrentContent();
        const contentStateWithEntity = currentContent.createEntity(
            "text",
            "MUTABLE",
            { imageURL }
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
        });
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, `<img src=\'${imageURL}\'/> `);
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
        this.onChange(newState);
        return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
            e,
            this.state.editorState,
            4, /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
            this.onChange(newEditorState);
        }
        return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
        RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
        )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
        RichUtils.toggleInlineStyle(
            this.state.editorState,
            inlineStyle
        )
        );
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
        }

        return (
        <div className="RichEditor-root">
            <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
            />
            
            <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            />

            {!this.props.textOnly && <div className='attachment-control'>
                {/* Add Image button */}
                <a><img src="https://img.icons8.com/officel/16/000000/add-image.png" 
                    onClick={() => this.insertImageRef.current.click()}/></a>
                <input type='file' 
                    ref={this.insertImageRef} onChange={this.handleInsertImageButton} 
                    hidden></input>
                {/* Add image link button */}
                <a><img src="https://img.icons8.com/material-two-tone/24/000000/link--v1.png"
                    onClick={() => {this.insertLinkRef.current.hidden = false; this.insertLinkInputRef.current.focus();}}/></a>
                <div ref={this.insertLinkRef} hidden>
                    <text>Paste URL: </text> 
                    <input type='text' 
                        ref={this.insertLinkInputRef}
                        onChange={(e) => this.setState({linkInput: e.target.value})} 
                        value={this.state.linkInput}
                        onBlur={() => {if(!this.state.linkInput.length) this.insertLinkRef.current.hidden = true;}}></input>
                    <button type='button' onClick={this.handleInsertLinkButton}>Insert</button>
                </div>
            </div> }
            
            

            
            <div className={className} onClick={this.focus}>
            <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                placeholder="Tell a story..."
                ref={this.editorRef}
                plugins={plugins}
                spellCheck={true}
            />
            </div>
        </div>
        );
    }
    }

    // Custom overrides for "code" style.
    const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    };

    function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
    }

    class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
        className += ' RichEditor-activeButton';
        }

        return (
        <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
        </span>
        );
    }
    }

    const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
    ];

    const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
            <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            />
        )}
        </div>
    );
    };

    var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
    ];

    const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
            <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            />
        )}
        </div>
    );
};

export default RichTextEditor;