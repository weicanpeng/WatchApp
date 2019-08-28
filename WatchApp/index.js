/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HeartRate from './component/HeartRate'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => HeartRate);