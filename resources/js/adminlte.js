import './bootstrap'
import '../adminlte/plugins/bootstrap/js/bootstrap.bundle'
import '../adminlte/plugins/datatables/jquery.dataTables'
import '../adminlte/dist/js/adminlte'


import { load, unload } from '../adminlte/dist/js/demo'
load()

document.addEventListener('turbolinks:before-render', () => {
    unload()
});

document.addEventListener(
    'turbolinks:load load',
    () => {
        load()
    }, {
        once: true,
    },
);

// Called after every non-initial page load
document.addEventListener('turbolinks:render', () => {
    load()
});