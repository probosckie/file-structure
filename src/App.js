import  React, { Component } from 'react';

import './css/font-awesome.min.css';
import './App.css';


const FILE_NAME_MAP= {
  'js':'js',
  'html':'html',
  'as3':'actionscript',
  'ahk':'autohotkey',
  'cpp':'c++',
  'c':'c',
  'css':'css',
  'png':'image',
  'jpg':'image',
  'jpeg':'image',
  'gif':'image',
  'java':'java',
  'jsp':'jsp',
  'less':'less',
  'php':'php',
  'py':'python',
  'scss':'scss',
  'sass':'sass',
  'sql':'sql',
  'txt':'text'
}


const SAMPLE_FOLDER_STRUCTURE = {
  root: {
    type:'folder',
    name:'prabhas-files',
    content: [
      {
        type:'file',
        name:'a.sql'
      },
      {
        type:'file',
        name:'client.py'
      },
      {
        type:'folder',
        name:' fun scripts',
        content: [
          {
            type:'file',
            name:'4.css'
          }
        ]
      }
    ]
  }
}


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      folder_structre: null,
      root: SAMPLE_FOLDER_STRUCTURE.root
    }
    this.parseFolderJson = this.parseFolderJson.bind(this);
    this.buildFileNode = this.buildFileNode.bind(this);
    this.buildFolderNode = this.buildFolderNode.bind(this);
    this.createChildFrom = this.createChildFrom.bind(this);
  }

  parseFolderJson(){
    return this.buildFolderNode(this.state.root);
  }

  buildFileNode(f){
    return <FileElement name={f.name} />
  }

  buildFolderNode(f){
    return <Folder folderName={f.name}>
        {this.createChildFrom(f.content)}
    </Folder>
  }

  createChildFrom(list){
    var childNodes = <ul>
      {list.map((e,i) => {
        if(e.type === 'file'){
          return <li><FileElement name={e.name}/></li>
        }
        else if(e.type === 'folder'){
          return <li>{this.buildFolderNode(e)}</li>
        }
      })}
    </ul>
    return childNodes;
  }

  render() {
    const { folder_structre } = this.state;
    return <div className="container">
      {folder_structre || ''}
    </div>
  }

  componentDidMount(){
    this.setState({
      folder_structre: this.parseFolderJson()
    });
  }
}

class Folder extends Component {
  constructor(){
    super();
    this.state = {
      expanded:false
    }
    this.toggleExpandCollapse = this.toggleExpandCollapse.bind(this);
  }

  toggleExpandCollapse(e) {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { expanded } = this.state;
    const { folderName, children } = this.props;
    const showChildren = expanded?'show':'hide';
    return (<span><div className="root-level"><ExpandCollapse expanded={expanded} onClick={this.toggleExpandCollapse} /><Icon folder={true} folderOpen={expanded} /> <span className="folder-name">{folderName}</span></div>
        <div className={"one-step-down "+ showChildren}>
          {children}
        </div></span>);
  }
}

const FileElement = ({name}) =>
  <span><Icon name={name} />{name}</span>


const ExpandCollapse = ({expanded, onClick }) => {
  const classString = 'expand-button fa fa-chevron-circle-right ' + (expanded?'down-arrow':'')
  return(<a href="#" onClick={onClick} className={classString}></a>)
}


const Icon = ({ folder, name, folderOpen }) => {
  let src =  folder?(folderOpen?'folder_open.png':'folder.png'):('file_type_'+FILE_NAME_MAP[name.split('.')[1]]+'.png')
  let imgPath = require('./img/'+ src);
  return <img className='bottom-align' src={imgPath} alt="N"/>;
}






