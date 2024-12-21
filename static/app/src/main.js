import './style.css';
import $ from 'jquery';
// import { galeneInit } from './galene';

$(function () {
    if ($('body').hasClass('page-galene')) {
        import('./galene').then(({ galeneInit }) => {
            galeneInit();
        });
    }
});