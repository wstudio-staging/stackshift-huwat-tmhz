import React from "react";

class WebriQForm extends React.Component {
  constructor(props) {
    super(props);
    this.loadWebriQFormScript = this.loadWebriQFormScript.bind(this);
  }

  componentDidMount() {
    if (window && !window.isWebriQFormLoaded) {
      this.loadWebriQFormScript();
    }

    if (window && window.isWebriQFormLoaded) {
      window.webriqFormRefresh();
    }
  }

  loadWebriQFormScript() {
    const webriqFormScript = document.getElementById("webriqform");

    if (!webriqFormScript) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "webriqform";
      script.defer = true;
      script.src =
        this.props.scriptSrc ||
        "https://pagebuilderforms.webriq.com/js/initReactForms";
      document.body.appendChild(script);
      const headScript = document.getElementsByTagName("script")[0];
      headScript.parentNode.insertBefore(script, headScript);
    }
  }

  componentWillUnmount() {
    const { unmountScript } = this.props;

    const webriqFormScript = document.getElementById("webriqform");
    if (webriqFormScript && unmountScript) {
      webriqFormScript.parentNode.removeChild(webriqFormScript);
    }

    if (window && unmountScript) {
      window.isWebriQFormLoaded = false;
    }

    const webriqFormRecaptcha = document.getElementById("webriqFormRecaptcha");
    if (webriqFormRecaptcha && unmountScript) {
      webriqFormRecaptcha.parentNode.removeChild(webriqFormRecaptcha);
    }
  }

  render() {
    const { id, name, className, ...rest } = this.props;
    const formId = this.props.formId || this.props["data-form-id"];
    let redirectURL =
      this.props.redirectUrl || this.props["data-thankyou-url"] || "/thank-you";

    return (
      <form
        name={name}
        id={id}
        className={className}
        method="POST"
        data-form-id={formId}
        data-thankyou-url={redirectURL}
        // eslint-disable-next-line react/no-unknown-property
        webriq="true"
        {...rest}
      >
        {this.props.children}
      </form>
    );
  }
}

export default WebriQForm;
