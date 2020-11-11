let mainHeader = '.main-header'
let mainSidebar = '.main-sidebar'

let navbar_dark_skins = [
    'navbar-primary',
    'navbar-secondary',
    'navbar-info',
    'navbar-success',
    'navbar-danger',
    'navbar-indigo',
    'navbar-purple',
    'navbar-pink',
    'navbar-navy',
    'navbar-lightblue',
    'navbar-teal',
    'navbar-cyan',
    'navbar-dark',
    'navbar-gray-dark',
    'navbar-gray',
]

let navbar_light_skins = [
    'navbar-light',
    'navbar-warning',
    'navbar-white',
    'navbar-orange',
]
let navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins)


let sidebar_colors = [
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-indigo',
    'bg-lightblue',
    'bg-navy',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-maroon',
    'bg-orange',
    'bg-lime',
    'bg-teal',
    'bg-olive'
]

let accent_colors = [
    'accent-primary',
    'accent-warning',
    'accent-info',
    'accent-danger',
    'accent-success',
    'accent-indigo',
    'accent-lightblue',
    'accent-navy',
    'accent-purple',
    'accent-fuchsia',
    'accent-pink',
    'accent-maroon',
    'accent-orange',
    'accent-lime',
    'accent-teal',
    'accent-olive'
]

let sidebar_skins = [
    'sidebar-dark-primary',
    'sidebar-dark-warning',
    'sidebar-dark-info',
    'sidebar-dark-danger',
    'sidebar-dark-success',
    'sidebar-dark-indigo',
    'sidebar-dark-lightblue',
    'sidebar-dark-navy',
    'sidebar-dark-purple',
    'sidebar-dark-fuchsia',
    'sidebar-dark-pink',
    'sidebar-dark-maroon',
    'sidebar-dark-orange',
    'sidebar-dark-lime',
    'sidebar-dark-teal',
    'sidebar-dark-olive',
    'sidebar-light-primary',
    'sidebar-light-warning',
    'sidebar-light-info',
    'sidebar-light-danger',
    'sidebar-light-success',
    'sidebar-light-indigo',
    'sidebar-light-lightblue',
    'sidebar-light-navy',
    'sidebar-light-purple',
    'sidebar-light-fuchsia',
    'sidebar-light-pink',
    'sidebar-light-maroon',
    'sidebar-light-orange',
    'sidebar-light-lime',
    'sidebar-light-teal',
    'sidebar-light-olive'
]

const setSetting = (name, value) => {
    let themeSetting = getSetting()
    themeSetting[name] = value
    return localStorage.setItem('theme-setting', JSON.stringify(themeSetting))
}
const getSetting = (name) => {
    let themeSetting = localStorage.getItem('theme-setting')
    themeSetting = themeSetting == null ? {} : JSON.parse(themeSetting)
    try {
        if (name) return themeSetting[name]
        return themeSetting
    } catch (error) {
        if (name) return null
        return {}
    }
}

const clearSetting = () => {
    localStorage.removeItem("theme-setting")
    try {
        if (Turbolinks.supported) return Turbolinks.reload()
        return window.location.reload()
    } catch (error) {
        return window.location.reload()
    }
}

const initTheme = () => {
    $(mainHeader).removeClass('navbar-dark').removeClass('navbar-light')
    navbar_all_colors.map(color => $(mainHeader).removeClass(color))

    // Navbar
    let navbar_variants_type = getSetting('navbar-variants-type')
    if (navbar_variants_type) {
        setSetting('navbar-variants-type', {
            el: mainHeader,
            class: navbar_variants_type.class,
            type: 'add'
        })
    } else {
        let navbar_theme = 'navbar-light'
        if ($(mainHeader).hasClass('navbar-dark')) navbar_theme = 'navbar-dark'
        setSetting('navbar-variants-type', {
            el: mainHeader,
            class: navbar_theme,
            type: 'add'
        })
    }
    let navbar_variants = getSetting('navbar-variants')
    if (navbar_variants) {
        setSetting('navbar-variants', {
            el: mainHeader,
            class: navbar_variants.class,
            type: 'add'
        })
    } else {
        let navbar_color = 'navbar-white'
        navbar_all_colors.map(color => {
            if ($(mainHeader).hasClass(color)) navbar_color = color
        })
        setSetting('navbar-variants', {
            el: mainHeader,
            class: navbar_color,
            type: 'add'
        })
    }

    // Accent
    accent_colors.map(color => {
        if ($('body').hasClass(color)) setSetting('accent-class', {
            el: 'body',
            class: color,
            type: 'add'
        })
    })

    // Sidebar
    let sidebarVariant = getSetting('sidebar-variant')
    if (sidebarVariant) {

        sidebar_skins.map(color => $(mainSidebar).removeClass(color))
        setSetting('sidebar-variant', {
            el: mainSidebar,
            class: sidebarVariant.class,
            type: 'add'
        })
    } else {
        sidebar_skins.map(color => {
            if ($(mainSidebar).hasClass(color)) setSetting('sidebar-variant', {
                el: mainSidebar,
                class: color,
                type: 'add'
            })
        })
    }



    let settings = getSetting()
    for (key in settings) {
        let setting = settings[key]
        if (setting.type == 'add') {
            $(setting.el).addClass(setting.class)
        } else {
            $(setting.el).removeClass(setting.class)
        }
    }
}

let $sidebarName = '.control-sidebar'
const load = () => {
    let $sidebar = $($sidebarName)
    let $container = $('<div />', {
        class: 'p-3 control-sidebar-content'
    })
    $sidebar.append($container)



    initTheme()



    $container.append(
        '<h5>Customize AdminLTE</h5><hr class="mb-2"/>'
    )

    let $no_border_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $(mainHeader).hasClass('border-bottom-0'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $(mainHeader).addClass('border-bottom-0')
            type = 'add'
        } else {
            $(mainHeader).removeClass('border-bottom-0')
            type = 'remove'
        }
        setSetting('no-navbar-border', {
            el: mainHeader,
            class: 'border-bottom-0',
            type: type
        })
    })
    let $no_border_container = $('<label />', { 'class': 'mb-1' }).append($no_border_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">No Navbar border</span>')
    $container.append($no_border_container)

    let $text_sm_body_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('text-sm'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('body').addClass('text-sm')
            type = 'add'
        } else {
            $('body').removeClass('text-sm')
            type = 'remove'
        }
        setSetting('body-small-text', {
            el: 'body',
            class: 'text-sm',
            type: type
        })
    })
    let $text_sm_body_container = $('<label />', { 'class': 'mb-1' }).append($text_sm_body_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Body small text</span>')
    $container.append($text_sm_body_container)

    let $text_sm_header_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $(mainHeader).hasClass('text-sm'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $(mainHeader).addClass('text-sm')
            type = 'add'
        } else {
            $(mainHeader).removeClass('text-sm')
        }
        setSetting('navbar-small-text', {
            el: mainHeader,
            class: 'text-sm',
            type: type
        })
    })
    let $text_sm_header_container = $('<label />', { 'class': 'mb-1' }).append($text_sm_header_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Navbar small text</span>')
    $container.append($text_sm_header_container)

    let $text_sm_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('text-sm'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('text-sm')
            type = 'add'
        } else {
            $('.nav-sidebar').removeClass('text-sm')
        }
        setSetting('sidebar-small-text', {
            el: '.nav-sidebar',
            class: 'text-sm',
            type: type
        })
    })
    let $text_sm_sidebar_container = $('<label />', { 'class': 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Sidebar nav small text</span>')
    $container.append($text_sm_sidebar_container)

    let $text_sm_footer_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.main-footer').hasClass('text-sm'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.main-footer').addClass('text-sm')
            type = 'add'
        } else {
            $('.main-footer').removeClass('text-sm')
        }
        setSetting('footer-small-text', {
            el: '.main-footer',
            class: 'text-sm',
            type: type
        })
    })
    let $text_sm_footer_container = $('<label />', { 'class': 'mb-1' }).append($text_sm_footer_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Footer small text</span>')
    $container.append($text_sm_footer_container)

    let $flat_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-flat'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-flat')
            type = 'add'
        } else {
            $('.nav-sidebar').removeClass('nav-flat')
        }
        setSetting('sidebar-nav-flat-style', {
            el: '.nav-sidebar',
            class: 'nav-flat',
            type: type
        })
    })
    let $flat_sidebar_container = $('<label />', { 'class': 'mb-1' }).append($flat_sidebar_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Sidebar nav flat style</span>')
    $container.append($flat_sidebar_container)

    let $legacy_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-legacy'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-legacy')
            type = 'add'
        } else {
            $('.nav-sidebar').removeClass('nav-legacy')
        }
        setSetting('sidebar-nav-legacy-style', {
            el: '.nav-sidebar',
            class: 'nav-legacy',
            type: type
        })
    })
    let $legacy_sidebar_container = $('<label />', { 'class': 'mb-1' }).append($legacy_sidebar_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Sidebar nav legacy style</span>')
    $container.append($legacy_sidebar_container)

    let $compact_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-compact'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-compact')
            type = 'add'
        } else {
            $('.nav-sidebar').removeClass('nav-compact')
        }
        setSetting('sidebar-nav-compact', {
            el: '.nav-sidebar',
            class: 'nav-compact',
            type: type
        })
    })
    let $compact_sidebar_container = $('<label />', { 'class': 'mb-1' }).append($compact_sidebar_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Sidebar nav compact</span>')
    $container.append($compact_sidebar_container)

    let $child_indent_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.nav-sidebar').hasClass('nav-child-indent'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.nav-sidebar').addClass('nav-child-indent')
            type = 'add'
        } else {
            $('.nav-sidebar').removeClass('nav-child-indent')
        }
        setSetting('sidebar-nav-child-indent', {
            el: '.nav-sidebar',
            class: 'nav-child-indent',
            type: type
        })
    })
    let $child_indent_sidebar_container = $('<label />', { 'class': 'mb-1' }).append($child_indent_sidebar_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Sidebar nav child indent</span>')
    $container.append($child_indent_sidebar_container)

    let $no_expand_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $(mainSidebar).hasClass('sidebar-no-expand'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $(mainSidebar).addClass('sidebar-no-expand')
            type = 'add'
        } else {
            $(mainSidebar).removeClass('sidebar-no-expand')
        }
        setSetting('main-sidebar-disable-hover-or-focus-auto-expanded', {
            el: mainSidebar,
            class: 'sidebar-no-expand',
            type: type
        })
    })
    let $no_expand_sidebar_container = $('<label />', { 'class': 'mb-1' }).append($no_expand_sidebar_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Main Sidebar disable hover/focus auto expand</span>')
    $container.append($no_expand_sidebar_container)

    let $text_sm_brand_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('.brand-link').hasClass('text-sm'),
        'class': 'mr-1'
    }).on('click', function() {
        let type = ''
        if ($(this).is(':checked')) {
            $('.brand-link').addClass('text-sm')
            type = 'add'
        } else {
            $('.brand-link').removeClass('text-sm')
        }
        setSetting('brand-small-text', {
            el: '.brand-link',
            class: 'text-sm',
            type: type
        })
    })
    let $text_sm_brand_container = $('<label />', { 'class': 'mb-4' }).append($text_sm_brand_checkbox).append('<span class="font-weight-normal" style="color:#c2c7d0;">Brand small text</span>')
    $container.append($text_sm_brand_container)

    $container.append('<h6>Navbar Variants</h6>')

    let $navbar_variants = $('<div />', {
        'class': 'd-flex'
    })
    let navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins)
    let $navbar_variants_colors = createSkinBlock(navbar_all_colors, function(e) {
        let color = $(this).data('color')
        let $main_header = $(mainHeader)
        $main_header.removeClass('navbar-dark').removeClass('navbar-light')
        navbar_all_colors.map(function(color) {
            $main_header.removeClass(color)
        })

        let navbar_theme = ''
        if (navbar_dark_skins.indexOf(color) > -1) {
            $main_header.addClass('navbar-dark')
            navbar_theme = 'navbar-dark'
        } else {
            $main_header.addClass('navbar-light')
            navbar_theme = 'navbar-light'
        }
        setSetting('navbar-variants-type', {
            el: mainHeader,
            class: navbar_theme,
            type: 'add'
        })
        $main_header.addClass(color)
        setSetting('navbar-variants', {
            el: mainHeader,
            class: color,
            type: 'add'
        })
    })

    $navbar_variants.append($navbar_variants_colors)

    $container.append($navbar_variants)



    $container.append('<h6>Accent Color Variants</h6>')
    let $accent_variants = $('<div />', {
        'class': 'd-flex'
    })
    $container.append($accent_variants)
    $container.append(createSkinBlock(accent_colors, function() {
        let color = $(this).data('color')
        let accent_class = color
        let $body = $('body')
        accent_colors.map(function(skin) {
            $body.removeClass(skin)
        })

        $body.addClass(accent_class)
        setSetting('accent-class', {
            el: 'body',
            class: accent_class,
            type: 'add'
        })
    }))

    $container.append('<h6>Dark Sidebar Variants</h6>')
    let $sidebar_variants_dark = $('<div />', {
        'class': 'd-flex'
    })
    $container.append($sidebar_variants_dark)
    $container.append(createSkinBlock(sidebar_colors, function() {
        let color = $(this).data('color')
        let sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
        let $sidebar = $(mainSidebar)
        sidebar_skins.map(function(skin) {
            $sidebar.removeClass(skin)
        })

        $sidebar.addClass(sidebar_class)
        setSetting('sidebar-variant', {
            el: mainSidebar,
            class: sidebar_class,
            type: 'add'
        })
    }))

    $container.append('<h6>Light Sidebar Variants</h6>')
    let $sidebar_variants_light = $('<div />', {
        'class': 'd-flex'
    })
    $container.append($sidebar_variants_light)
    $container.append(createSkinBlock(sidebar_colors, function() {
        let color = $(this).data('color')
        let sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
        let $sidebar = $(mainSidebar)
        sidebar_skins.map(function(skin) {
            $sidebar.removeClass(skin)
        })

        $sidebar.addClass(sidebar_class)
        setSetting('sidebar-variant', {
            el: mainSidebar,
            class: sidebar_class,
            type: 'add'
        })
    }))

    let logo_skins = navbar_all_colors
    $container.append('<h6>Brand Logo Variants</h6>')
    let $logo_variants = $('<div />', {
        'class': 'd-flex'
    })
    $container.append($logo_variants)
    let $clear_btn = $('<a />', {
        href: 'javascript:void(0)'
    }).text('clear').on('click', function() {
        let $logo = $('.brand-link')
        logo_skins.map(function(skin) {
            $logo.removeClass(skin)
        })
        clearSetting()
    })
    $container.append(createSkinBlock(logo_skins, function() {
        let color = $(this).data('color')
        let $logo = $('.brand-link')
        logo_skins.map(function(skin) {
            $logo.removeClass(skin)
        })
        $logo.addClass(color)
    }).append($clear_btn))

    function createSkinBlock(colors, callback) {
        let $block = $('<div />', {
            'class': 'd-flex flex-wrap mb-3'
        })

        colors.map(function(color) {
            let $color = $('<div />', {
                'class': (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-') + ' elevation-2'
            })

            $block.append($color)

            $color.data('color', color)

            $color.css({
                width: '40px',
                height: '20px',
                borderRadius: '25px',
                marginRight: 10,
                marginBottom: 10,
                opacity: 0.8,
                cursor: 'pointer'
            })

            $color.hover(function() {
                $(this).css({ opacity: 1 }).removeClass('elevation-2').addClass('elevation-4')
            }, function() {
                $(this).css({ opacity: 0.8 }).removeClass('elevation-4').addClass('elevation-2')
            })

            if (callback) {
                $color.on('click', callback)
            }
        })

        return $block
    }

    $('.product-image-thumb').on('click', function() {
        const image_element = $(this).find('img');
        $('.product-image').prop('src', $(image_element).attr('src'))
        $('.product-image-thumb.active').removeClass('active');
        $(this).addClass('active');
    })
}


module.exports = { load }