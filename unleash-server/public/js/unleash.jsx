/** @jsx React.DOM */
/* jshint quotmark:false */

// Unleash
//   - Menu
//   - FeatureList
//       - UnsavedFeature
//       - SavedFeature
//

var Menu = React.createClass({
    render: function() { return <div/>; }
});


var UnsavedFeature = React.createClass({
    // TODO: form
    render: function() { return <div/>; }
});

var SavedFeature = React.createClass({
    render: function() {
        return (
            <div>{this.props.feature.name}</div>
        );
    }
});

var FeatureList = React.createClass({
    render: function() {
        var featureNodes = [];

        this.props.unsavedFeatures.forEach(function(feature) {
            featureNodes.push(<UnsavedFeature feature={feature} />);
        });

        this.props.savedFeatures.forEach(function(feature) {
            featureNodes.push(<SavedFeature key={feature.name} feature={feature} />);
        });

        return (<div>{featureNodes}</div>);
    }

});

var Unleash = React.createClass({
    getInitialState: function() {
        return { savedFeatures: [], unsavedFeatures: [] };
    },

    componentDidMount: function () {
        this.loadFeaturesFromServer();
        setInterval(this.loadFeaturesFromServer, this.props.pollInterval);
    },

    loadFeaturesFromServer: function () {
        reqwest('features').then(this.setFeatures, this.handleError);
    },

    setFeatures: function (data) {
        this.setState({savedFeatures: data.features});
    },

    handleError: function (error) {
        // TODO: ErrorComponent
        window.alert(error);
    },

    render: function() {
        return (
            <div>
              <Menu />
              <FeatureList
                unsavedFeatures={this.state.unsavedFeatures}
                savedFeatures={this.state.savedFeatures} />
            </div>
        );
    }
});


React.renderComponent(
    <Unleash pollInterval={5000} />,
    document.getElementById('content')
);