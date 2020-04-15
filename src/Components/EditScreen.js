import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { request } from "graphql-request";
import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";
import ColorStyleControls from "./ColorStyleControls";
import ActionControls from "./ActionControls";
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from "@material-ui/core/colors";
import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from "./graphql/mutations";
import editorbg from "../img/editorbg.png";

const styles = (theme) => ({
  root: {
    flexGrow: "3",
    display: "flex",
    flexDirection: "column",
    background: grey[900],
    backgroundImage: `url(${editorbg})`,
    fontSize: "14px",
    padding: "15px",
    color: grey[100],
    borderLeft: "1px solid black",
    paddingTop: "30px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "60px",
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  editor: {},
  blockStyleControls: {
    backgroundColor: grey[800],
    width: "100%",
    height: "40px",
  },
  inlineStyleControls: {
    backgroundColor: grey[800],
    width: "100%",
    height: "40px",
  },
  colorStyleControls: {
    backgroundColor: grey[800],
    width: "100%",
    height: "40px",
  },
  actionControls: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const styleMap = {
  CODE: {
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const colorStyleMap = {
  red: { color: red[500] },
  pink: { color: pink[500] },
  purple: { color: purple[500] },
  deepPurple: { color: deepPurple[500] },
  indigo: { color: indigo[500] },
  blue: { color: blue[500] },
  lightBlue: { color: lightBlue[500] },
  cyan: { color: cyan[500] },
  teal: { color: teal[500] },
  green: { color: green[500] },
  lightGreen: { color: lightGreen[500] },
  lime: { color: lime[500] },
  yellow: { color: yellow[500] },
  amber: { color: amber[500] },
  orange: { color: orange[500] },
  deepOrange: { color: deepOrange[500] },
  brown: { color: brown[500] },
  grey: { color: grey[500] },
  blueGrey: { color: blueGrey[500] },
};

class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      curId: "",
      changed: false,
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState, changed: true });
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);

    this.updateEditorState = this.updateEditorState.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    console.log("mount");
    this.updateEditorState();
  }

  componentDidUpdate() {
    console.log("update");
    if (this.props.curNote._id !== this.state.curId) {
      this.updateEditorState();
    }
  }

  updateEditorState() {
    console.log("updateEditorState");
    const rawEditorData = JSON.parse(this.props.curNote.content);
    if (rawEditorData !== null) {
      const contentState = convertFromRaw(rawEditorData);
      this.setState({
        editorState: EditorState.createWithContent(contentState),
        curId: this.props.curNote._id,
      });
    }
  }

  onSave = async () => {
    this.props.setLoading(true);
    const jsonState = await JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    const curId = this.state.curId;
    request(process.env.REACT_APP_API_SERVER, UPDATE_NOTE, {
      _id: curId,
      content: jsonState,
    }).then((data) => {
      console.log("successfully save:", data);
      this.props.jsonData(curId);
      this.setState({ changed: false });
    });
  };

  onAdd = async () => {
    this.props.setLoading(true);
    const newEditorState = EditorState.createEmpty();
    const jsonState = await JSON.stringify(
      convertToRaw(newEditorState.getCurrentContent())
    );

    request(process.env.REACT_APP_API_SERVER, ADD_NOTE, {
      content: jsonState,
    }).then((data) => {
      console.log("successfully add:", data);
      this.props.jsonData(data.addNote._id);
      this.setState({ changed: false });
    });
  };

  onUpdate = async () => {
    this.props.setLoading(true);
    this.props.jsonData(this.state.curId);
  };

  onDelete = async () => {
    this.props.setLoading(true);
    const curId = this.state.curId;
    request(process.env.REACT_APP_API_SERVER, DELETE_NOTE, {
      _id: curId,
    }).then((data) => {
      console.log("successfully delete:", data);
      this.props.jsonData();
      this.setState({ changed: false });
    });
  };

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
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _toggleColor(toggledColor) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className={classes.root}>
        <ActionControls
          className={classes.actionControls}
          onSave={this.onSave}
          onAdd={this.onAdd}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
          changed={this.state.changed}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
          className={classes.blockStyleControls}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
          className={classes.inlineStyleControls}
        />
        <ColorStyleControls
          editorState={editorState}
          onToggle={this.toggleColor}
          className={classes.colorStyleControls}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={{ ...styleMap, ...colorStyleMap }}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Start writing something beautiful 🌈"
            ref="editor"
            spellCheck={true}
            className={classes.editor}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditScreen);
