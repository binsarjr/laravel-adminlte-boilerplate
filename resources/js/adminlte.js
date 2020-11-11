import './bootstrap'
import '../adminlte/plugins/bootstrap/js/bootstrap.bundle'
import '../adminlte/plugins/datatables/jquery.dataTables'
import '../adminlte/dist/js/adminlte'


import adminlte from '../adminlte/dist/js/demo'


// Called once after the initial page has loaded
$(window).on('turbolinks:load load', adminlte.load)

// Called after every non-initial page load
document.addEventListener('turbolinks:render', adminlte.load)