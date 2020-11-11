import './bootstrap'
import '../adminlte/plugins/bootstrap/js/bootstrap.bundle'
import '../adminlte/plugins/datatables/jquery.dataTables'
import '../adminlte/dist/js/adminlte'


import adminlte from '../adminlte/dist/js/demo'
try {
    adminlte.load()

    // Called once after the initial page has loaded
    document.addEventListener('turbolinks:load load', adminlte.load, { once: true })

    // Called after every non-initial page load
    document.addEventListener('turbolinks:render', adminlte.load)
} catch (error) {
    console.error(error)
}