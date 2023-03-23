import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableUserManage.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
    // this.props.deleteUserRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        usersRedux: this.props.users,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserParent(user);
  };
  render() {
    let listUsers = this.state.usersRedux;
    return (
      <>
        <table id="TableUserManage">
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersrStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
