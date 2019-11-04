import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    state = {
        users: [],
        username: "",
        email: "",
        editing: false,
        _id: ""
    }
    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }
    getUsers = async () => {
        const res = await axios.get("http://localhost:4000/api/users");
        this.setState({ users: res.data });
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email
        }

        if (this.state.editing) {
            await axios.put("http://localhost:4000/api/users/" + this.state._id, newUser);
        } else {
            await axios.post('http://localhost:4000/api/users', newUser);
        }
        this.cleanState();
        this.getUsers();
    }
    async cleanState() {
        this.setState({
            email: '',
            username: ''
        });
    }
    onCancel = async (e) => {
        e.preventDefault();
        window.location.href = "/";
    }
    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.cleanState();
        this.getUsers();
    }
    getUser = async (id) => {
        const res = await axios.get('http://localhost:4000/api/users/' + id);
        this.setState({
            username: res.data.username,
            email: res.data.email,
            editing: true,
            _id: id
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <button type="cancel" className="btn btn-secondary float-right" onClick={this.onCancel}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li
                                    className="list-group-item list-group-item-action"
                                    key={user._id}
                                >
                                    {user.username}
                                    <button type="button" className="btn btn-danger float-right" onClick={() => this.deleteUser(user._id)}>
                                        Delete
                                    </button>
                                    <button type="button" className="btn btn-secondary float-right" onClick={() => this.getUser(user._id)}>
                                        Edit
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}