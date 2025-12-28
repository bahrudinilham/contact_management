import React from "react";

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setStatePartial(partialState, callback) {
        this.setState(prev => {
            const updates = typeof partialState === "function" ? partialState(prev) : partialState;
            return { ...prev, ...updates };
        }, callback);
    }
}
