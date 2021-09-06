/**
 * Main entry point
 * */
import 'rxjs';

import AppContainer from './containers/AppContainer';
import './assets/styles/style.scss';
import axios from 'axios';

//axios config

axios.defaults.headers.common['X-Kafka-Lenses-Token'] = sessionStorage.getItem('token');