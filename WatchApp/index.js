/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HelpView from './component/VoiceScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => HelpView);