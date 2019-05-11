import React from "react";

export default (WrappedComponent, delay) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.enableLoader = this.enableLoader.bind(this);

      this.state = {
        displayLoader: false
      };

      this.timer = setTimeout(this.enableLoader, delay);
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    enableLoader() {
      this.setState({ displayLoader: true });
    }

    render() {
      const { displayLoader } = this.state;

      if (!displayLoader) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
