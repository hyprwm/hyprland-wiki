# HL.ConfigValueTypes

#### *class* HL.ConfigValueTypes

Type definition.

## Shape

```text
{
    ['animations.enabled'] = boolean,
    ['animations.workspace_wraparound'] = boolean,
    ['binds.allow_pin_fullscreen'] = boolean,
    ['binds.allow_workspace_cycles'] = boolean,
    ['binds.disable_keybind_grabbing'] = boolean,
    ['binds.drag_threshold'] = integer | boolean,
    ['binds.focus_preferred_method'] = integer | boolean,
    ['binds.hide_special_on_workspace_change'] = boolean,
    ['binds.ignore_group_lock'] = boolean,
    ['binds.movefocus_cycles_fullscreen'] = boolean,
    ['binds.movefocus_cycles_groupfirst'] = boolean,
    ['binds.pass_mouse_when_bound'] = boolean,
    ['binds.scroll_event_delay'] = integer | boolean,
    ['binds.window_direction_monitor_fallback'] = boolean,
    ['binds.workspace_back_and_forth'] = boolean,
    ['binds.workspace_center_on'] = integer | boolean,
    ['cursor.default_monitor'] = string,
    ['cursor.enable_hyprcursor'] = boolean,
    ['cursor.hide_on_key_press'] = boolean,
    ['cursor.hide_on_tablet'] = boolean,
    ['cursor.hide_on_touch'] = boolean,
    ['cursor.hotspot_padding'] = integer | boolean,
    ['cursor.inactive_timeout'] = number | boolean,
    ['cursor.invisible'] = boolean,
    ['cursor.min_refresh_rate'] = integer | boolean,
    ['cursor.no_break_fs_vrr'] = integer | boolean,
    ['cursor.no_hardware_cursors'] = integer | boolean,
    ['cursor.no_warps'] = boolean,
    ['cursor.persistent_warps'] = boolean,
    ['cursor.sync_gsettings_theme'] = boolean,
    ['cursor.use_cpu_buffer'] = integer | boolean,
    ['cursor.warp_back_after_non_mouse_input'] = boolean,
    ['cursor.warp_on_change_workspace'] = integer | boolean,
    ['cursor.warp_on_toggle_special'] = integer | boolean,
    ['cursor.zoom_detached_camera'] = boolean,
    ['cursor.zoom_disable_aa'] = boolean,
    ['cursor.zoom_factor'] = number | boolean,
    ['cursor.zoom_rigid'] = boolean,
    ['debug.colored_stdout_logs'] = boolean,
    ['debug.damage_blink'] = boolean,
    ['debug.damage_tracking'] = integer | boolean,
    ['debug.disable_logs'] = boolean,
    ['debug.disable_scale_checks'] = boolean,
    ['debug.disable_time'] = boolean,
    ['debug.ds_handle_same_buffer'] = boolean,
    ['debug.ds_handle_same_buffer_fifo'] = boolean,
    ['debug.enable_stdout_logs'] = boolean,
    ['debug.error_limit'] = integer | boolean,
    ['debug.error_position'] = integer | boolean,
    ['debug.fifo_pending_workaround'] = boolean,
    ['debug.full_cm_proto'] = boolean,
    ['debug.gl_debugging'] = boolean,
    ['debug.invalidate_fp16'] = integer | boolean,
    ['debug.log_damage'] = boolean,
    ['debug.manual_crash'] = integer | boolean,
    ['debug.overlay'] = boolean,
    ['debug.pass'] = boolean,
    ['debug.render_solitary_wo_damage'] = boolean,
    ['debug.suppress_errors'] = boolean,
    ['debug.vfr'] = boolean,
    ['decoration.active_opacity'] = number | boolean,
    ['decoration.blur.brightness'] = number | boolean,
    ['decoration.blur.contrast'] = number | boolean,
    ['decoration.blur.enabled'] = boolean,
    ['decoration.blur.ignore_opacity'] = boolean,
    ['decoration.blur.input_methods'] = boolean,
    ['decoration.blur.input_methods_ignorealpha'] = number | boolean,
    ['decoration.blur.new_optimizations'] = boolean,
    ['decoration.blur.noise'] = number | boolean,
    ['decoration.blur.passes'] = integer | boolean,
    ['decoration.blur.popups'] = boolean,
    ['decoration.blur.popups_ignorealpha'] = number | boolean,
    ['decoration.blur.size'] = integer | boolean,
    ['decoration.blur.special'] = boolean,
    ['decoration.blur.vibrancy'] = number | boolean,
    ['decoration.blur.vibrancy_darkness'] = number | boolean,
    ['decoration.blur.xray'] = boolean,
    ['decoration.border_part_of_window'] = boolean,
    ['decoration.dim_around'] = number | boolean,
    ['decoration.dim_inactive'] = boolean,
    ['decoration.dim_modal'] = boolean,
    ['decoration.dim_special'] = number | boolean,
    ['decoration.dim_strength'] = number | boolean,
    ['decoration.fullscreen_opacity'] = number | boolean,
    ['decoration.glow.color'] = string,
    ['decoration.glow.color_inactive'] = string,
    ['decoration.glow.enabled'] = boolean,
    ['decoration.glow.range'] = integer | boolean,
    ['decoration.glow.render_power'] = integer | boolean,
    ['decoration.inactive_opacity'] = number | boolean,
    ['decoration.rounding'] = integer | boolean,
    ['decoration.rounding_power'] = number | boolean,
    ['decoration.screen_shader'] = string,
    ['decoration.shadow.color'] = string,
    ['decoration.shadow.color_inactive'] = string,
    ['decoration.shadow.enabled'] = boolean,
    ['decoration.shadow.offset'] = HL.Vec2Like,
    ['decoration.shadow.range'] = integer | boolean,
    ['decoration.shadow.render_power'] = integer | boolean,
    ['decoration.shadow.scale'] = number | boolean,
    ['decoration.shadow.sharp'] = boolean,
    ['dwindle.default_split_ratio'] = number | boolean,
    ['dwindle.force_split'] = integer | boolean,
    ['dwindle.permanent_direction_override'] = boolean,
    ['dwindle.precise_mouse_move'] = boolean,
    ['dwindle.preserve_split'] = boolean,
    ['dwindle.smart_resizing'] = boolean,
    ['dwindle.smart_split'] = boolean,
    ['dwindle.special_scale_factor'] = number | boolean,
    ['dwindle.split_bias'] = integer | boolean,
    ['dwindle.split_width_multiplier'] = number | boolean,
    ['dwindle.use_active_for_splits'] = boolean,
    ['ecosystem.enforce_permissions'] = boolean,
    ['ecosystem.no_donation_nag'] = boolean,
    ['ecosystem.no_update_news'] = boolean,
    ['experimental.wp_cm_1_2'] = boolean,
    ['general.allow_tearing'] = boolean,
    ['general.border_size'] = integer | boolean,
    ['general.col.active_border'] = string | HL.Gradient,
    ['general.col.inactive_border'] = string | HL.Gradient,
    ['general.col.nogroup_border'] = string | HL.Gradient,
    ['general.col.nogroup_border_active'] = string | HL.Gradient,
    ['general.extend_border_grab_area'] = integer | boolean,
    ['general.float_gaps'] = integer | HL.CssGap,
    ['general.gaps_in'] = integer | HL.CssGap,
    ['general.gaps_out'] = integer | HL.CssGap,
    ['general.gaps_workspaces'] = integer | boolean,
    ['general.hover_icon_on_border'] = boolean,
    ['general.layout'] = string,
    ['general.locale'] = string,
    ['general.modal_parent_blocking'] = boolean,
    ['general.no_focus_fallback'] = boolean,
    ['general.resize_corner'] = integer | boolean,
    ['general.resize_on_border'] = boolean,
    ['general.snap.border_overlap'] = boolean,
    ['general.snap.enabled'] = boolean,
    ['general.snap.monitor_gap'] = integer | boolean,
    ['general.snap.respect_gaps'] = boolean,
    ['general.snap.window_gap'] = integer | boolean,
    ['gestures.close_max_timeout'] = integer | boolean,
    ['gestures.scrolling.move_snap_cursor'] = boolean,
    ['gestures.scrolling.move_snap_to_grid'] = boolean,
    ['gestures.workspace_swipe_cancel_ratio'] = number | boolean,
    ['gestures.workspace_swipe_create_new'] = boolean,
    ['gestures.workspace_swipe_direction_lock'] = boolean,
    ['gestures.workspace_swipe_direction_lock_threshold'] = integer | boolean,
    ['gestures.workspace_swipe_distance'] = integer | boolean,
    ['gestures.workspace_swipe_forever'] = boolean,
    ['gestures.workspace_swipe_invert'] = boolean,
    ['gestures.workspace_swipe_min_speed_to_force'] = integer | boolean,
    ['gestures.workspace_swipe_touch'] = boolean,
    ['gestures.workspace_swipe_touch_invert'] = boolean,
    ['gestures.workspace_swipe_use_r'] = boolean,
    ['group.auto_group'] = boolean,
    ['group.col.border_active'] = string | HL.Gradient,
    ['group.col.border_inactive'] = string | HL.Gradient,
    ['group.col.border_locked_active'] = string | HL.Gradient,
    ['group.col.border_locked_inactive'] = string | HL.Gradient,
    ['group.drag_into_group'] = integer | boolean,
    ['group.focus_removed_window'] = boolean,
    ['group.group_on_movetoworkspace'] = boolean,
    ['group.groupbar.blur'] = boolean,
    ['group.groupbar.col.active'] = string | HL.Gradient,
    ['group.groupbar.col.inactive'] = string | HL.Gradient,
    ['group.groupbar.col.locked_active'] = string | HL.Gradient,
    ['group.groupbar.col.locked_inactive'] = string | HL.Gradient,
    ['group.groupbar.enabled'] = boolean,
    ['group.groupbar.font_family'] = string,
    ['group.groupbar.font_size'] = integer | boolean,
    ['group.groupbar.font_weight_active'] = integer | string,
    ['group.groupbar.font_weight_inactive'] = integer | string,
    ['group.groupbar.gaps_in'] = integer | boolean,
    ['group.groupbar.gaps_out'] = integer | boolean,
    ['group.groupbar.gradient_round_only_edges'] = boolean,
    ['group.groupbar.gradient_rounding'] = integer | boolean,
    ['group.groupbar.gradient_rounding_power'] = number | boolean,
    ['group.groupbar.gradients'] = boolean,
    ['group.groupbar.height'] = integer | boolean,
    ['group.groupbar.indicator_gap'] = integer | boolean,
    ['group.groupbar.indicator_height'] = integer | boolean,
    ['group.groupbar.keep_upper_gap'] = boolean,
    ['group.groupbar.middle_click_close'] = boolean,
    ['group.groupbar.priority'] = integer | boolean,
    ['group.groupbar.render_titles'] = boolean,
    ['group.groupbar.round_only_edges'] = boolean,
    ['group.groupbar.rounding'] = integer | boolean,
    ['group.groupbar.rounding_power'] = number | boolean,
    ['group.groupbar.scrolling'] = boolean,
    ['group.groupbar.stacked'] = boolean,
    ['group.groupbar.text_color'] = string,
    ['group.groupbar.text_color_inactive'] = string,
    ['group.groupbar.text_color_locked_active'] = string,
    ['group.groupbar.text_color_locked_inactive'] = string,
    ['group.groupbar.text_offset'] = integer | boolean,
    ['group.groupbar.text_padding'] = integer | boolean,
    ['group.insert_after_current'] = boolean,
    ['group.merge_floated_into_tiled_on_groupbar'] = boolean,
    ['group.merge_groups_on_drag'] = boolean,
    ['group.merge_groups_on_groupbar'] = boolean,
    ['input.accel_profile'] = string,
    ['input.emulate_discrete_scroll'] = integer | boolean,
    ['input.float_switch_override_focus'] = integer | boolean,
    ['input.focus_on_close'] = integer | boolean,
    ['input.follow_mouse'] = integer | boolean,
    ['input.follow_mouse_shrink'] = integer | boolean,
    ['input.follow_mouse_threshold'] = number | boolean,
    ['input.force_no_accel'] = boolean,
    ['input.kb_file'] = string,
    ['input.kb_layout'] = string,
    ['input.kb_model'] = string,
    ['input.kb_options'] = string,
    ['input.kb_rules'] = string,
    ['input.kb_variant'] = string,
    ['input.left_handed'] = boolean,
    ['input.mouse_refocus'] = boolean,
    ['input.natural_scroll'] = boolean,
    ['input.numlock_by_default'] = boolean,
    ['input.off_window_axis_events'] = integer | boolean,
    ['input.repeat_delay'] = integer | boolean,
    ['input.repeat_rate'] = integer | boolean,
    ['input.resolve_binds_by_sym'] = boolean,
    ['input.rotation'] = integer | boolean,
    ['input.scroll_button'] = integer | boolean,
    ['input.scroll_button_lock'] = boolean,
    ['input.scroll_factor'] = number | boolean,
    ['input.scroll_method'] = string,
    ['input.scroll_points'] = string,
    ['input.sensitivity'] = number | boolean,
    ['input.special_fallthrough'] = boolean,
    ['input.tablet.absolute_region_position'] = boolean,
    ['input.tablet.active_area_position'] = HL.Vec2Like,
    ['input.tablet.active_area_size'] = HL.Vec2Like,
    ['input.tablet.left_handed'] = boolean,
    ['input.tablet.output'] = string,
    ['input.tablet.region_position'] = HL.Vec2Like,
    ['input.tablet.region_size'] = HL.Vec2Like,
    ['input.tablet.relative_input'] = boolean,
    ['input.tablet.transform'] = integer | boolean,
    ['input.touchdevice.enabled'] = boolean,
    ['input.touchdevice.output'] = string,
    ['input.touchdevice.transform'] = integer | boolean,
    ['input.touchpad.clickfinger_behavior'] = boolean,
    ['input.touchpad.disable_while_typing'] = boolean,
    ['input.touchpad.drag_3fg'] = integer | boolean,
    ['input.touchpad.drag_lock'] = integer | boolean,
    ['input.touchpad.flip_x'] = boolean,
    ['input.touchpad.flip_y'] = boolean,
    ['input.touchpad.middle_button_emulation'] = boolean,
    ['input.touchpad.natural_scroll'] = boolean,
    ['input.touchpad.scroll_factor'] = number | boolean,
    ['input.touchpad.tap_and_drag'] = boolean,
    ['input.touchpad.tap_button_map'] = string,
    ['input.touchpad.tap_to_click'] = boolean,
    ['input.virtualkeyboard.release_pressed_on_close'] = boolean,
    ['input.virtualkeyboard.share_states'] = integer | boolean,
    ['layout.single_window_aspect_ratio'] = HL.Vec2Like,
    ['layout.single_window_aspect_ratio_tolerance'] = number | boolean,
    ['master.allow_small_split'] = boolean,
    ['master.always_keep_position'] = boolean,
    ['master.center_ignores_reserved'] = boolean,
    ['master.center_master_fallback'] = string,
    ['master.drop_at_cursor'] = boolean,
    ['master.mfact'] = number | boolean,
    ['master.new_on_active'] = string,
    ['master.new_on_top'] = boolean,
    ['master.new_status'] = string,
    ['master.orientation'] = string,
    ['master.slave_count_for_center_master'] = integer | boolean,
    ['master.smart_resizing'] = boolean,
    ['master.special_scale_factor'] = number | boolean,
    ['misc.allow_session_lock_restore'] = boolean,
    ['misc.always_follow_on_dnd'] = boolean,
    ['misc.animate_manual_resizes'] = boolean,
    ['misc.animate_mouse_windowdragging'] = boolean,
    ['misc.anr_missed_pings'] = integer | boolean,
    ['misc.background_color'] = string,
    ['misc.close_special_on_empty'] = boolean,
    ['misc.col.splash'] = string,
    ['misc.disable_autoreload'] = boolean,
    ['misc.disable_hyprland_guiutils_check'] = boolean,
    ['misc.disable_hyprland_logo'] = boolean,
    ['misc.disable_scale_notification'] = boolean,
    ['misc.disable_splash_rendering'] = boolean,
    ['misc.disable_watchdog_warning'] = boolean,
    ['misc.disable_xdg_env_checks'] = boolean,
    ['misc.enable_anr_dialog'] = boolean,
    ['misc.enable_swallow'] = boolean,
    ['misc.exit_window_retains_fullscreen'] = boolean,
    ['misc.focus_on_activate'] = boolean,
    ['misc.font_family'] = string,
    ['misc.force_default_wallpaper'] = integer | boolean,
    ['misc.initial_workspace_tracking'] = integer | boolean,
    ['misc.key_press_enables_dpms'] = boolean,
    ['misc.layers_hog_keyboard_focus'] = boolean,
    ['misc.lockdead_screen_delay'] = integer | boolean,
    ['misc.middle_click_paste'] = boolean,
    ['misc.mouse_move_enables_dpms'] = boolean,
    ['misc.mouse_move_focuses_monitor'] = boolean,
    ['misc.name_vk_after_proc'] = boolean,
    ['misc.on_focus_under_fullscreen'] = integer | boolean,
    ['misc.render_unfocused_fps'] = integer | boolean,
    ['misc.screencopy_force_8b'] = boolean,
    ['misc.session_lock_xray'] = boolean,
    ['misc.size_limits_tiled'] = boolean,
    ['misc.splash_font_family'] = string,
    ['misc.swallow_exception_regex'] = string,
    ['misc.swallow_regex'] = string,
    ['misc.vrr'] = integer | boolean,
    ['opengl.nvidia_anti_flicker'] = boolean,
    ['quirks.prefer_hdr'] = integer | boolean,
    ['quirks.skip_non_kms_dmabuf_formats'] = boolean,
    ['render.cm_auto_hdr'] = integer | boolean,
    ['render.cm_enabled'] = boolean,
    ['render.cm_sdr_eotf'] = string,
    ['render.commit_timing_enabled'] = boolean,
    ['render.ctm_animation'] = integer | boolean,
    ['render.direct_scanout'] = integer | boolean,
    ['render.expand_undersized_textures'] = boolean,
    ['render.fp16_sdr_tf'] = integer | boolean,
    ['render.icc_vcgt_enabled'] = boolean,
    ['render.keep_unmodified_copy'] = integer | boolean,
    ['render.new_render_scheduling'] = boolean,
    ['render.non_shader_cm'] = integer | boolean,
    ['render.non_shader_cm_interop'] = integer | boolean,
    ['render.send_content_type'] = boolean,
    ['render.use_fp16'] = integer | boolean,
    ['render.use_shader_blur_blend'] = boolean,
    ['render.xp_mode'] = boolean,
    ['scrolling.column_width'] = number | boolean,
    ['scrolling.direction'] = string,
    ['scrolling.explicit_column_widths'] = string,
    ['scrolling.focus_fit_method'] = integer | boolean,
    ['scrolling.follow_focus'] = boolean,
    ['scrolling.follow_min_visible'] = number | boolean,
    ['scrolling.fullscreen_on_one_column'] = boolean,
    ['scrolling.wrap_focus'] = boolean,
    ['scrolling.wrap_swapcol'] = boolean,
    ['xwayland.create_abstract_socket'] = boolean,
    ['xwayland.enabled'] = boolean,
    ['xwayland.force_zero_scaling'] = boolean,
    ['xwayland.use_nearest_neighbor'] = boolean,
}
```

## Fields

[‘animations.enabled’]
: [‘animations.enabled’].

[‘animations.workspace_wraparound’]
: [‘animations.workspace wraparound’].

[‘binds.allow_pin_fullscreen’]
: [‘binds.allow pin fullscreen’].

[‘binds.allow_workspace_cycles’]
: [‘binds.allow workspace cycles’].

[‘binds.disable_keybind_grabbing’]
: [‘binds.disable keybind grabbing’].

[‘binds.drag_threshold’]
: [‘binds.drag threshold’].

[‘binds.focus_preferred_method’]
: [‘binds.focus preferred method’].

[‘binds.hide_special_on_workspace_change’]
: [‘binds.hide special on workspace change’].

[‘binds.ignore_group_lock’]
: [‘binds.ignore group lock’].

[‘binds.movefocus_cycles_fullscreen’]
: [‘binds.movefocus cycles fullscreen’].

[‘binds.movefocus_cycles_groupfirst’]
: [‘binds.movefocus cycles groupfirst’].

[‘binds.pass_mouse_when_bound’]
: [‘binds.pass mouse when bound’].

[‘binds.scroll_event_delay’]
: [‘binds.scroll event delay’].

[‘binds.window_direction_monitor_fallback’]
: [‘binds.window direction monitor fallback’].

[‘binds.workspace_back_and_forth’]
: [‘binds.workspace back and forth’].

[‘binds.workspace_center_on’]
: [‘binds.workspace center on’].

[‘cursor.default_monitor’]
: [‘cursor.default monitor’].

[‘cursor.enable_hyprcursor’]
: [‘cursor.enable hyprcursor’].

[‘cursor.hide_on_key_press’]
: [‘cursor.hide on key press’].

[‘cursor.hide_on_tablet’]
: [‘cursor.hide on tablet’].

[‘cursor.hide_on_touch’]
: [‘cursor.hide on touch’].

[‘cursor.hotspot_padding’]
: [‘cursor.hotspot padding’].

[‘cursor.inactive_timeout’]
: [‘cursor.inactive timeout’].

[‘cursor.invisible’]
: [‘cursor.invisible’].

[‘cursor.min_refresh_rate’]
: [‘cursor.min refresh rate’].

[‘cursor.no_break_fs_vrr’]
: [‘cursor.no break fs vrr’].

[‘cursor.no_hardware_cursors’]
: [‘cursor.no hardware cursors’].

[‘cursor.no_warps’]
: [‘cursor.no warps’].

[‘cursor.persistent_warps’]
: [‘cursor.persistent warps’].

[‘cursor.sync_gsettings_theme’]
: [‘cursor.sync gsettings theme’].

[‘cursor.use_cpu_buffer’]
: [‘cursor.use cpu buffer’].

[‘cursor.warp_back_after_non_mouse_input’]
: [‘cursor.warp back after non mouse input’].

[‘cursor.warp_on_change_workspace’]
: [‘cursor.warp on change workspace’].

[‘cursor.warp_on_toggle_special’]
: [‘cursor.warp on toggle special’].

[‘cursor.zoom_detached_camera’]
: [‘cursor.zoom detached camera’].

[‘cursor.zoom_disable_aa’]
: [‘cursor.zoom disable aa’].

[‘cursor.zoom_factor’]
: [‘cursor.zoom factor’].

[‘cursor.zoom_rigid’]
: [‘cursor.zoom rigid’].

[‘debug.colored_stdout_logs’]
: [‘debug.colored stdout logs’].

[‘debug.damage_blink’]
: [‘debug.damage blink’].

[‘debug.damage_tracking’]
: [‘debug.damage tracking’].

[‘debug.disable_logs’]
: [‘debug.disable logs’].

[‘debug.disable_scale_checks’]
: [‘debug.disable scale checks’].

[‘debug.disable_time’]
: [‘debug.disable time’].

[‘debug.ds_handle_same_buffer’]
: [‘debug.ds handle same buffer’].

[‘debug.ds_handle_same_buffer_fifo’]
: [‘debug.ds handle same buffer fifo’].

[‘debug.enable_stdout_logs’]
: [‘debug.enable stdout logs’].

[‘debug.error_limit’]
: [‘debug.error limit’].

[‘debug.error_position’]
: [‘debug.error position’].

[‘debug.fifo_pending_workaround’]
: [‘debug.fifo pending workaround’].

[‘debug.full_cm_proto’]
: [‘debug.full cm proto’].

[‘debug.gl_debugging’]
: [‘debug.gl debugging’].

[‘debug.invalidate_fp16’]
: [‘debug.invalidate fp16’].

[‘debug.log_damage’]
: [‘debug.log damage’].

[‘debug.manual_crash’]
: [‘debug.manual crash’].

[‘debug.overlay’]
: [‘debug.overlay’].

[‘debug.pass’]
: [‘debug.pass’].

[‘debug.render_solitary_wo_damage’]
: [‘debug.render solitary wo damage’].

[‘debug.suppress_errors’]
: [‘debug.suppress errors’].

[‘debug.vfr’]
: [‘debug.vfr’].

[‘decoration.active_opacity’]
: [‘decoration.active opacity’].

[‘decoration.blur.brightness’]
: [‘decoration.blur.brightness’].

[‘decoration.blur.contrast’]
: [‘decoration.blur.contrast’].

[‘decoration.blur.enabled’]
: [‘decoration.blur.enabled’].

[‘decoration.blur.ignore_opacity’]
: [‘decoration.blur.ignore opacity’].

[‘decoration.blur.input_methods’]
: [‘decoration.blur.input methods’].

[‘decoration.blur.input_methods_ignorealpha’]
: [‘decoration.blur.input methods ignorealpha’].

[‘decoration.blur.new_optimizations’]
: [‘decoration.blur.new optimizations’].

[‘decoration.blur.noise’]
: [‘decoration.blur.noise’].

[‘decoration.blur.passes’]
: [‘decoration.blur.passes’].

[‘decoration.blur.popups’]
: [‘decoration.blur.popups’].

[‘decoration.blur.popups_ignorealpha’]
: [‘decoration.blur.popups ignorealpha’].

[‘decoration.blur.size’]
: [‘decoration.blur.size’].

[‘decoration.blur.special’]
: [‘decoration.blur.special’].

[‘decoration.blur.vibrancy’]
: [‘decoration.blur.vibrancy’].

[‘decoration.blur.vibrancy_darkness’]
: [‘decoration.blur.vibrancy darkness’].

[‘decoration.blur.xray’]
: [‘decoration.blur.xray’].

[‘decoration.border_part_of_window’]
: [‘decoration.border part of window’].

[‘decoration.dim_around’]
: [‘decoration.dim around’].

[‘decoration.dim_inactive’]
: [‘decoration.dim inactive’].

[‘decoration.dim_modal’]
: [‘decoration.dim modal’].

[‘decoration.dim_special’]
: [‘decoration.dim special’].

[‘decoration.dim_strength’]
: [‘decoration.dim strength’].

[‘decoration.fullscreen_opacity’]
: [‘decoration.fullscreen opacity’].

[‘decoration.glow.color’]
: [‘decoration.glow.color’].

[‘decoration.glow.color_inactive’]
: [‘decoration.glow.color inactive’].

[‘decoration.glow.enabled’]
: [‘decoration.glow.enabled’].

[‘decoration.glow.range’]
: [‘decoration.glow.range’].

[‘decoration.glow.render_power’]
: [‘decoration.glow.render power’].

[‘decoration.inactive_opacity’]
: [‘decoration.inactive opacity’].

[‘decoration.rounding’]
: [‘decoration.rounding’].

[‘decoration.rounding_power’]
: [‘decoration.rounding power’].

[‘decoration.screen_shader’]
: [‘decoration.screen shader’].

[‘decoration.shadow.color’]
: [‘decoration.shadow.color’].

[‘decoration.shadow.color_inactive’]
: [‘decoration.shadow.color inactive’].

[‘decoration.shadow.enabled’]
: [‘decoration.shadow.enabled’].

[‘decoration.shadow.offset’]
: [‘decoration.shadow.offset’].

[‘decoration.shadow.range’]
: [‘decoration.shadow.range’].

[‘decoration.shadow.render_power’]
: [‘decoration.shadow.render power’].

[‘decoration.shadow.scale’]
: [‘decoration.shadow.scale’].

[‘decoration.shadow.sharp’]
: [‘decoration.shadow.sharp’].

[‘dwindle.default_split_ratio’]
: [‘dwindle.default split ratio’].

[‘dwindle.force_split’]
: [‘dwindle.force split’].

[‘dwindle.permanent_direction_override’]
: [‘dwindle.permanent direction override’].

[‘dwindle.precise_mouse_move’]
: [‘dwindle.precise mouse move’].

[‘dwindle.preserve_split’]
: [‘dwindle.preserve split’].

[‘dwindle.smart_resizing’]
: [‘dwindle.smart resizing’].

[‘dwindle.smart_split’]
: [‘dwindle.smart split’].

[‘dwindle.special_scale_factor’]
: [‘dwindle.special scale factor’].

[‘dwindle.split_bias’]
: [‘dwindle.split bias’].

[‘dwindle.split_width_multiplier’]
: [‘dwindle.split width multiplier’].

[‘dwindle.use_active_for_splits’]
: [‘dwindle.use active for splits’].

[‘ecosystem.enforce_permissions’]
: [‘ecosystem.enforce permissions’].

[‘ecosystem.no_donation_nag’]
: [‘ecosystem.no donation nag’].

[‘ecosystem.no_update_news’]
: [‘ecosystem.no update news’].

[‘experimental.wp_cm_1_2’]
: [‘experimental.wp cm 1 2’].

[‘general.allow_tearing’]
: [‘general.allow tearing’].

[‘general.border_size’]
: [‘general.border size’].

[‘general.col.active_border’]
: [‘general.col.active border’].

[‘general.col.inactive_border’]
: [‘general.col.inactive border’].

[‘general.col.nogroup_border’]
: [‘general.col.nogroup border’].

[‘general.col.nogroup_border_active’]
: [‘general.col.nogroup border active’].

[‘general.extend_border_grab_area’]
: [‘general.extend border grab area’].

[‘general.float_gaps’]
: [‘general.float gaps’].

[‘general.gaps_in’]
: [‘general.gaps in’].

[‘general.gaps_out’]
: [‘general.gaps out’].

[‘general.gaps_workspaces’]
: [‘general.gaps workspaces’].

[‘general.hover_icon_on_border’]
: [‘general.hover icon on border’].

[‘general.layout’]
: [‘general.layout’].

[‘general.locale’]
: [‘general.locale’].

[‘general.modal_parent_blocking’]
: [‘general.modal parent blocking’].

[‘general.no_focus_fallback’]
: [‘general.no focus fallback’].

[‘general.resize_corner’]
: [‘general.resize corner’].

[‘general.resize_on_border’]
: [‘general.resize on border’].

[‘general.snap.border_overlap’]
: [‘general.snap.border overlap’].

[‘general.snap.enabled’]
: [‘general.snap.enabled’].

[‘general.snap.monitor_gap’]
: [‘general.snap.monitor gap’].

[‘general.snap.respect_gaps’]
: [‘general.snap.respect gaps’].

[‘general.snap.window_gap’]
: [‘general.snap.window gap’].

[‘gestures.close_max_timeout’]
: [‘gestures.close max timeout’].

[‘gestures.scrolling.move_snap_cursor’]
: [‘gestures.scrolling.move snap cursor’].

[‘gestures.scrolling.move_snap_to_grid’]
: [‘gestures.scrolling.move snap to grid’].

[‘gestures.workspace_swipe_cancel_ratio’]
: [‘gestures.workspace swipe cancel ratio’].

[‘gestures.workspace_swipe_create_new’]
: [‘gestures.workspace swipe create new’].

[‘gestures.workspace_swipe_direction_lock’]
: [‘gestures.workspace swipe direction lock’].

[‘gestures.workspace_swipe_direction_lock_threshold’]
: [‘gestures.workspace swipe direction lock threshold’].

[‘gestures.workspace_swipe_distance’]
: [‘gestures.workspace swipe distance’].

[‘gestures.workspace_swipe_forever’]
: [‘gestures.workspace swipe forever’].

[‘gestures.workspace_swipe_invert’]
: [‘gestures.workspace swipe invert’].

[‘gestures.workspace_swipe_min_speed_to_force’]
: [‘gestures.workspace swipe min speed to force’].

[‘gestures.workspace_swipe_touch’]
: [‘gestures.workspace swipe touch’].

[‘gestures.workspace_swipe_touch_invert’]
: [‘gestures.workspace swipe touch invert’].

[‘gestures.workspace_swipe_use_r’]
: [‘gestures.workspace swipe use r’].

[‘group.auto_group’]
: [‘group.auto group’].

[‘group.col.border_active’]
: [‘group.col.border active’].

[‘group.col.border_inactive’]
: [‘group.col.border inactive’].

[‘group.col.border_locked_active’]
: [‘group.col.border locked active’].

[‘group.col.border_locked_inactive’]
: [‘group.col.border locked inactive’].

[‘group.drag_into_group’]
: [‘group.drag into group’].

[‘group.focus_removed_window’]
: [‘group.focus removed window’].

[‘group.group_on_movetoworkspace’]
: [‘group.group on movetoworkspace’].

[‘group.groupbar.blur’]
: [‘group.groupbar.blur’].

[‘group.groupbar.col.active’]
: [‘group.groupbar.col.active’].

[‘group.groupbar.col.inactive’]
: [‘group.groupbar.col.inactive’].

[‘group.groupbar.col.locked_active’]
: [‘group.groupbar.col.locked active’].

[‘group.groupbar.col.locked_inactive’]
: [‘group.groupbar.col.locked inactive’].

[‘group.groupbar.enabled’]
: [‘group.groupbar.enabled’].

[‘group.groupbar.font_family’]
: [‘group.groupbar.font family’].

[‘group.groupbar.font_size’]
: [‘group.groupbar.font size’].

[‘group.groupbar.font_weight_active’]
: [‘group.groupbar.font weight active’].

[‘group.groupbar.font_weight_inactive’]
: [‘group.groupbar.font weight inactive’].

[‘group.groupbar.gaps_in’]
: [‘group.groupbar.gaps in’].

[‘group.groupbar.gaps_out’]
: [‘group.groupbar.gaps out’].

[‘group.groupbar.gradient_round_only_edges’]
: [‘group.groupbar.gradient round only edges’].

[‘group.groupbar.gradient_rounding’]
: [‘group.groupbar.gradient rounding’].

[‘group.groupbar.gradient_rounding_power’]
: [‘group.groupbar.gradient rounding power’].

[‘group.groupbar.gradients’]
: [‘group.groupbar.gradients’].

[‘group.groupbar.height’]
: [‘group.groupbar.height’].

[‘group.groupbar.indicator_gap’]
: [‘group.groupbar.indicator gap’].

[‘group.groupbar.indicator_height’]
: [‘group.groupbar.indicator height’].

[‘group.groupbar.keep_upper_gap’]
: [‘group.groupbar.keep upper gap’].

[‘group.groupbar.middle_click_close’]
: [‘group.groupbar.middle click close’].

[‘group.groupbar.priority’]
: [‘group.groupbar.priority’].

[‘group.groupbar.render_titles’]
: [‘group.groupbar.render titles’].

[‘group.groupbar.round_only_edges’]
: [‘group.groupbar.round only edges’].

[‘group.groupbar.rounding’]
: [‘group.groupbar.rounding’].

[‘group.groupbar.rounding_power’]
: [‘group.groupbar.rounding power’].

[‘group.groupbar.scrolling’]
: [‘group.groupbar.scrolling’].

[‘group.groupbar.stacked’]
: [‘group.groupbar.stacked’].

[‘group.groupbar.text_color’]
: [‘group.groupbar.text color’].

[‘group.groupbar.text_color_inactive’]
: [‘group.groupbar.text color inactive’].

[‘group.groupbar.text_color_locked_active’]
: [‘group.groupbar.text color locked active’].

[‘group.groupbar.text_color_locked_inactive’]
: [‘group.groupbar.text color locked inactive’].

[‘group.groupbar.text_offset’]
: [‘group.groupbar.text offset’].

[‘group.groupbar.text_padding’]
: [‘group.groupbar.text padding’].

[‘group.insert_after_current’]
: [‘group.insert after current’].

[‘group.merge_floated_into_tiled_on_groupbar’]
: [‘group.merge floated into tiled on groupbar’].

[‘group.merge_groups_on_drag’]
: [‘group.merge groups on drag’].

[‘group.merge_groups_on_groupbar’]
: [‘group.merge groups on groupbar’].

[‘input.accel_profile’]
: [‘input.accel profile’].

[‘input.emulate_discrete_scroll’]
: [‘input.emulate discrete scroll’].

[‘input.float_switch_override_focus’]
: [‘input.float switch override focus’].

[‘input.focus_on_close’]
: [‘input.focus on close’].

[‘input.follow_mouse’]
: [‘input.follow mouse’].

[‘input.follow_mouse_shrink’]
: [‘input.follow mouse shrink’].

[‘input.follow_mouse_threshold’]
: [‘input.follow mouse threshold’].

[‘input.force_no_accel’]
: [‘input.force no accel’].

[‘input.kb_file’]
: [‘input.kb file’].

[‘input.kb_layout’]
: [‘input.kb layout’].

[‘input.kb_model’]
: [‘input.kb model’].

[‘input.kb_options’]
: [‘input.kb options’].

[‘input.kb_rules’]
: [‘input.kb rules’].

[‘input.kb_variant’]
: [‘input.kb variant’].

[‘input.left_handed’]
: [‘input.left handed’].

[‘input.mouse_refocus’]
: [‘input.mouse refocus’].

[‘input.natural_scroll’]
: [‘input.natural scroll’].

[‘input.numlock_by_default’]
: [‘input.numlock by default’].

[‘input.off_window_axis_events’]
: [‘input.off window axis events’].

[‘input.repeat_delay’]
: [‘input.repeat delay’].

[‘input.repeat_rate’]
: [‘input.repeat rate’].

[‘input.resolve_binds_by_sym’]
: [‘input.resolve binds by sym’].

[‘input.rotation’]
: [‘input.rotation’].

[‘input.scroll_button’]
: [‘input.scroll button’].

[‘input.scroll_button_lock’]
: [‘input.scroll button lock’].

[‘input.scroll_factor’]
: [‘input.scroll factor’].

[‘input.scroll_method’]
: [‘input.scroll method’].

[‘input.scroll_points’]
: [‘input.scroll points’].

[‘input.sensitivity’]
: [‘input.sensitivity’].

[‘input.special_fallthrough’]
: [‘input.special fallthrough’].

[‘input.tablet.absolute_region_position’]
: [‘input.tablet.absolute region position’].

[‘input.tablet.active_area_position’]
: [‘input.tablet.active area position’].

[‘input.tablet.active_area_size’]
: [‘input.tablet.active area size’].

[‘input.tablet.left_handed’]
: [‘input.tablet.left handed’].

[‘input.tablet.output’]
: [‘input.tablet.output’].

[‘input.tablet.region_position’]
: [‘input.tablet.region position’].

[‘input.tablet.region_size’]
: [‘input.tablet.region size’].

[‘input.tablet.relative_input’]
: [‘input.tablet.relative input’].

[‘input.tablet.transform’]
: [‘input.tablet.transform’].

[‘input.touchdevice.enabled’]
: [‘input.touchdevice.enabled’].

[‘input.touchdevice.output’]
: [‘input.touchdevice.output’].

[‘input.touchdevice.transform’]
: [‘input.touchdevice.transform’].

[‘input.touchpad.clickfinger_behavior’]
: [‘input.touchpad.clickfinger behavior’].

[‘input.touchpad.disable_while_typing’]
: [‘input.touchpad.disable while typing’].

[‘input.touchpad.drag_3fg’]
: [‘input.touchpad.drag 3fg’].

[‘input.touchpad.drag_lock’]
: [‘input.touchpad.drag lock’].

[‘input.touchpad.flip_x’]
: [‘input.touchpad.flip x’].

[‘input.touchpad.flip_y’]
: [‘input.touchpad.flip y’].

[‘input.touchpad.middle_button_emulation’]
: [‘input.touchpad.middle button emulation’].

[‘input.touchpad.natural_scroll’]
: [‘input.touchpad.natural scroll’].

[‘input.touchpad.scroll_factor’]
: [‘input.touchpad.scroll factor’].

[‘input.touchpad.tap_and_drag’]
: [‘input.touchpad.tap and drag’].

[‘input.touchpad.tap_button_map’]
: [‘input.touchpad.tap button map’].

[‘input.touchpad.tap_to_click’]
: [‘input.touchpad.tap to click’].

[‘input.virtualkeyboard.release_pressed_on_close’]
: [‘input.virtualkeyboard.release pressed on close’].

[‘input.virtualkeyboard.share_states’]
: [‘input.virtualkeyboard.share states’].

[‘layout.single_window_aspect_ratio’]
: [‘layout.single window aspect ratio’].

[‘layout.single_window_aspect_ratio_tolerance’]
: [‘layout.single window aspect ratio tolerance’].

[‘master.allow_small_split’]
: [‘master.allow small split’].

[‘master.always_keep_position’]
: [‘master.always keep position’].

[‘master.center_ignores_reserved’]
: [‘master.center ignores reserved’].

[‘master.center_master_fallback’]
: [‘master.center master fallback’].

[‘master.drop_at_cursor’]
: [‘master.drop at cursor’].

[‘master.mfact’]
: [‘master.mfact’].

[‘master.new_on_active’]
: [‘master.new on active’].

[‘master.new_on_top’]
: [‘master.new on top’].

[‘master.new_status’]
: [‘master.new status’].

[‘master.orientation’]
: [‘master.orientation’].

[‘master.slave_count_for_center_master’]
: [‘master.slave count for center master’].

[‘master.smart_resizing’]
: [‘master.smart resizing’].

[‘master.special_scale_factor’]
: [‘master.special scale factor’].

[‘misc.allow_session_lock_restore’]
: [‘misc.allow session lock restore’].

[‘misc.always_follow_on_dnd’]
: [‘misc.always follow on dnd’].

[‘misc.animate_manual_resizes’]
: [‘misc.animate manual resizes’].

[‘misc.animate_mouse_windowdragging’]
: [‘misc.animate mouse windowdragging’].

[‘misc.anr_missed_pings’]
: [‘misc.anr missed pings’].

[‘misc.background_color’]
: [‘misc.background color’].

[‘misc.close_special_on_empty’]
: [‘misc.close special on empty’].

[‘misc.col.splash’]
: [‘misc.col.splash’].

[‘misc.disable_autoreload’]
: [‘misc.disable autoreload’].

[‘misc.disable_hyprland_guiutils_check’]
: [‘misc.disable hyprland guiutils check’].

[‘misc.disable_hyprland_logo’]
: [‘misc.disable hyprland logo’].

[‘misc.disable_scale_notification’]
: [‘misc.disable scale notification’].

[‘misc.disable_splash_rendering’]
: [‘misc.disable splash rendering’].

[‘misc.disable_watchdog_warning’]
: [‘misc.disable watchdog warning’].

[‘misc.disable_xdg_env_checks’]
: [‘misc.disable xdg env checks’].

[‘misc.enable_anr_dialog’]
: [‘misc.enable anr dialog’].

[‘misc.enable_swallow’]
: [‘misc.enable swallow’].

[‘misc.exit_window_retains_fullscreen’]
: [‘misc.exit window retains fullscreen’].

[‘misc.focus_on_activate’]
: [‘misc.focus on activate’].

[‘misc.font_family’]
: [‘misc.font family’].

[‘misc.force_default_wallpaper’]
: [‘misc.force default wallpaper’].

[‘misc.initial_workspace_tracking’]
: [‘misc.initial workspace tracking’].

[‘misc.key_press_enables_dpms’]
: [‘misc.key press enables dpms’].

[‘misc.layers_hog_keyboard_focus’]
: [‘misc.layers hog keyboard focus’].

[‘misc.lockdead_screen_delay’]
: [‘misc.lockdead screen delay’].

[‘misc.middle_click_paste’]
: [‘misc.middle click paste’].

[‘misc.mouse_move_enables_dpms’]
: [‘misc.mouse move enables dpms’].

[‘misc.mouse_move_focuses_monitor’]
: [‘misc.mouse move focuses monitor’].

[‘misc.name_vk_after_proc’]
: [‘misc.name vk after proc’].

[‘misc.on_focus_under_fullscreen’]
: [‘misc.on focus under fullscreen’].

[‘misc.render_unfocused_fps’]
: [‘misc.render unfocused fps’].

[‘misc.screencopy_force_8b’]
: [‘misc.screencopy force 8b’].

[‘misc.session_lock_xray’]
: [‘misc.session lock xray’].

[‘misc.size_limits_tiled’]
: [‘misc.size limits tiled’].

[‘misc.splash_font_family’]
: [‘misc.splash font family’].

[‘misc.swallow_exception_regex’]
: [‘misc.swallow exception regex’].

[‘misc.swallow_regex’]
: [‘misc.swallow regex’].

[‘misc.vrr’]
: [‘misc.vrr’].

[‘opengl.nvidia_anti_flicker’]
: [‘opengl.nvidia anti flicker’].

[‘quirks.prefer_hdr’]
: [‘quirks.prefer hdr’].

[‘quirks.skip_non_kms_dmabuf_formats’]
: [‘quirks.skip non kms dmabuf formats’].

[‘render.cm_auto_hdr’]
: [‘render.cm auto hdr’].

[‘render.cm_enabled’]
: [‘render.cm enabled’].

[‘render.cm_sdr_eotf’]
: [‘render.cm sdr eotf’].

[‘render.commit_timing_enabled’]
: [‘render.commit timing enabled’].

[‘render.ctm_animation’]
: [‘render.ctm animation’].

[‘render.direct_scanout’]
: [‘render.direct scanout’].

[‘render.expand_undersized_textures’]
: [‘render.expand undersized textures’].

[‘render.fp16_sdr_tf’]
: [‘render.fp16 sdr tf’].

[‘render.icc_vcgt_enabled’]
: [‘render.icc vcgt enabled’].

[‘render.keep_unmodified_copy’]
: [‘render.keep unmodified copy’].

[‘render.new_render_scheduling’]
: [‘render.new render scheduling’].

[‘render.non_shader_cm’]
: [‘render.non shader cm’].

[‘render.non_shader_cm_interop’]
: [‘render.non shader cm interop’].

[‘render.send_content_type’]
: [‘render.send content type’].

[‘render.use_fp16’]
: [‘render.use fp16’].

[‘render.use_shader_blur_blend’]
: [‘render.use shader blur blend’].

[‘render.xp_mode’]
: [‘render.xp mode’].

[‘scrolling.column_width’]
: [‘scrolling.column width’].

[‘scrolling.direction’]
: [‘scrolling.direction’].

[‘scrolling.explicit_column_widths’]
: [‘scrolling.explicit column widths’].

[‘scrolling.focus_fit_method’]
: [‘scrolling.focus fit method’].

[‘scrolling.follow_focus’]
: [‘scrolling.follow focus’].

[‘scrolling.follow_min_visible’]
: [‘scrolling.follow min visible’].

[‘scrolling.fullscreen_on_one_column’]
: [‘scrolling.fullscreen on one column’].

[‘scrolling.wrap_focus’]
: [‘scrolling.wrap focus’].

[‘scrolling.wrap_swapcol’]
: [‘scrolling.wrap swapcol’].

[‘xwayland.create_abstract_socket’]
: [‘xwayland.create abstract socket’].

[‘xwayland.enabled’]
: [‘xwayland.enabled’].

[‘xwayland.force_zero_scaling’]
: [‘xwayland.force zero scaling’].

[‘xwayland.use_nearest_neighbor’]
: [‘xwayland.use nearest neighbor’].

<!-- TODO: Replace generic field summaries with source-checked behavior. -->
