require('./bootstrap')
require('../adminlte/plugins/bootstrap/js/bootstrap.bundle')
require('../adminlte/plugins/datatables/jquery.dataTables')
require('../adminlte/dist/js/adminlte')


const adminlteDemo = require('../adminlte/dist/js/demo')
adminlteDemo.load()

document.addEventListener('turbolinks:before-render', () => {
    adminlteDemo.unload()
});

document.addEventListener(
    'turbolinks:load load',
    () => {
        adminlteDemo.load()
    }, {
        once: true,
    },
);

// Called after every non-initial page load
document.addEventListener('turbolinks:render', () => {
    adminlteDemo.load()
});