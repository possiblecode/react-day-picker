/* eslint react/no-danger: 0 */
import React, { Component } from 'react';

import { createHistory } from 'history';

import Prism from './vendors/prism';
import './vendors/prism.css';

import Birthdays from './examples/Birthdays';
import DisabledDays from './examples/DisabledDays';
import InputField from './examples/InputField';
import Localized from './examples/Localized';
import LocalizedCustom from './examples/LocalizedCustom';
import Modifiers from './examples/Modifiers';
import Range from './examples/Range';
import Restricted from './examples/Restricted';
import SelectableDay from './examples/SelectableDay';
import SimpleCalendar from './examples/SimpleCalendar';
import YearCalendar from './examples/YearCalendar';
import YearNavigation from './examples/YearNavigation';

const history = createHistory();

const EXAMPLES = {
  simple: {
    title: 'Simple Calendar',
    description: 'Show the clicked day in an alert dialog.',
    Component: SimpleCalendar,
  },
  selectable: {
    title: 'Selectable Day',
    description: "This example uses the <code>selectedDays</code> prop and <a href='http://www.gpbl.org/react-day-picker/docs/DateUtils.html'>DateUtils</a> to select a day. Note how the selected day is stored in the parent component's state.",
    Component: SelectableDay,
  },
  disabled: {
    title: 'Disabled Days',
    description: 'Using the <code>disabledDays</code> prop, you can prevent the user to select a day in the past: the <code>handleDayClick</code> handler doesn\'t update the state if the day has been marked as <code>disabled</code>.',
    Component: DisabledDays,
  },
  input: {
    title: 'Input Field',
    description: 'Connect the day picker with an input field.',
    Component: InputField,
  },
  range: {
    title: 'Range of Days',
    description: "Select a range of days using the range functions available in <a href='http://www.gpbl.org/react-day-picker/docs/DateUtils.html'>DateUtils</a>.",
    Component: Range,
  },
  modifiers: {
    title: 'Advanced Modifiers',
    description: 'Using the <code>modifiers</code> prop you can customize the aspect and the behaviour for each day. Note how the <code>onDay*</code> props receive the modifiers as third argument.',
    Component: Modifiers,
  },
  restricted: {
    title: 'Restrict Months',
    description: 'The <code>fromMonth</code> and <code>toMonth</code> props allow to restrict the navigation between months. The following day picker is enabled from April to November 2015. A <code>disabled</code> modifier displays the other days as grayed out.',
    Component: Restricted,
  },
  localized: {
    title: 'Localization (moment.js)',
    description: "This calendar is localized using moment.js. <a href='http://www.gpbl.org/react-day-picker/docs/Localization.html'>Read more about localization</a>.<br>Note the use of the <a href='https://www.w3.org/TR/html/dom.html#the-dir-attribute'>dir attribute</a> to support <abbr title='Right to left'>RTL</abbr> languages.",
    Component: Localized,
  },
  localizedCustom: {
    title: 'Localization (custom)',
    description: "If you prefer to not include external libraries to localize the calendar, you can provide your own <code>localeUtils</code> which is basically a rewrite of the <a href='https://github.com/gpbl/react-day-picker/blob/master/src/LocaleUtils.js'>original one</a>. The following example provides Russian and English localizations.  <a href='http://www.gpbl.org/react-day-picker/docs/Localization.html'>Read more about localization</a>.",
    Component: LocalizedCustom,
  },
  yearNavigation: {
    title: 'Year Navigation',
    description: 'With the <code>captionElement</code> prop, you can use your own element as month caption. In this example, the caption element is a form to navigate up to the next 10 years.',
    Component: YearNavigation,
  },
  birthdays: {
    title: 'Birthdays',
    description: 'Add custom content to days cells using the <code>renderDay</code> prop.',
    Component: Birthdays,
  },
  year: {
    title: 'Year Calendar',
    description: 'Use <code>numberOfMonths</code> to display a custom number of calendars.',
    Component: YearCalendar,
  },
};


export default class Examples extends Component {

  state = {
    currentExample: 'simple',
    showNavBar: false,
  };

  componentDidMount() {
    this.unlistenHistory = history.listen(::this.handleHistoryChange);
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  handleHistoryChange({ hash }) {
    const currentExample = hash.replace('#', '');
    if (currentExample in EXAMPLES) {

      this.setState({ currentExample, showNavBar: false }, () => window.scrollTo(0, 0));
    }
  }

  renderNavBarExamples() {
    const links = [];
    const { currentExample } = this.state;
    for (const exampleName in EXAMPLES) {
      links.push(
        <a
          href={`#${exampleName}`}
          key={exampleName}
          className={currentExample === exampleName ? 'selected' : ''}
        >
          {EXAMPLES[exampleName].title}
        </a>
      );
    }

    return <div className="NavBar-links">{links}</div>;
  }

  render() {
    const { currentExample, showNavBar } = this.state;

    const ExampleComponent = EXAMPLES[currentExample].Component;

    return (
      <div>
        <div className="NavBar-toggle" onClick={() => { this.setState({ showNavBar: !showNavBar }); }} />
        <div className="Header">
          <a href="http://www.gpbl.org/react-day-picker/">
            <img src="https://cloud.githubusercontent.com/assets/120693/12529597/79225e4a-c1bd-11e5-9001-cc27c6b9bb1b.png" style={{ maxWidth: '230px' }} />
          </a>
        </div>
        <div className={`Content${showNavBar ? ' navbar-is-visible' : ''}`}>

          <div className="NavBar">
            <div className="NavBar-wrapper">
              <h3>Examples</h3>
              {this.renderNavBarExamples()}

              <h3 style={{ paddingTop: '1rem' }}>About</h3>
              <a href="http://www.gpbl.org/react-day-picker">
                Documentation
              </a>
              <a href="https://github.com/gpbl/react-day-picker">
                Github
              </a>
              <iframe style={{ marginLeft: '1rem', marginTop: '0.5rem' }} src="https://ghbtns.com/github-btn.html?user=gpbl&amp;repo=react-day-picker&amp;type=star&amp;count=true"
                frameBorder={0} scrolling={0} width="110px" height="20px"
              ></iframe>
            </div>
          </div>

          <div className="Examples">
            <h2>
                {EXAMPLES[currentExample].title}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: EXAMPLES[currentExample].description }} />
            <div className="Example">

              <div className="Example-Result">
                <ExampleComponent />
              </div>
              <div className="Example-Code">
                <pre>
                  <code className="language-jsx">
                    {require('!raw!./examples/' + ExampleComponent.name + '.js')}
                  </code>
                </pre>
              </div>
            </div>

            <p style={{ fontSize: '0.75em' }}>
              <a href={`https://github.com/gpbl/react-day-picker/blob/master/examples/src/examples/${ExampleComponent.name}.js`}>See source on Github</a>
            </p>
          </div>
        </div>
      </div>

    );
  }

}
