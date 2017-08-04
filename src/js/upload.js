define('upload', ['jquery', 'webuploader'], function($, WebUploader) {
    var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "..";

    function SuiJiNum() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function initWebUpload(item, options) {

        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。<a target='_blank' href='http://se.360.cn'>下载页面</a>";
            if (window.console) {
                window.console.log(error);
            }
            $(item).text(error);
            return;
        }
        //创建默认参数
        var defaults = {
            auto: true,
            hiddenInputId: "uploadifyHiddenInputId", // input hidden id
            onAllComplete: function(event) {}, // 当所有file都上传后执行的回调函数
            onComplete: function(event) {}, // 每上传一个file的回调函数
            innerOptions: {},
            fileNumLimit: undefined, //验证文件总数量, 超出则不允许加入队列
            fileSizeLimit: undefined, //验证文件总大小是否超出限制, 超出则不允许加入队列。
            fileSingleSizeLimit: undefined, //验证单个文件大小是否超出限制, 超出则不允许加入队列
            PostbackHold: false
        };
        var opts = $.extend(defaults, options);
        var hdFileData = $("#" + opts.hiddenInputId);
        var target = $(item); //容器
        var pickerid = "";

        var $wrap = target,
            // 图片容器
            $queue = $('<ul class="filelist"></ul>')
            .appendTo($wrap.find('.queueList')),

            // 状态栏，包括进度和控制按钮
            $statusBar = $wrap.find('.statusBar'),

            // 文件总体选择信息。
            $info = $statusBar.find('.info'),

            // 上传按钮
            // $upload = $wrap.find('.uploadBtn'),

            // 没选择文件之前的内容。
            $placeHolder = $wrap.find('.placeholder'),

            $progress = $statusBar.find('.progress').hide(),

            // 添加的文件数量
            fileCount = 0,

            // 添加的文件总大小
            fileSize = 0,

            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth = 110 * ratio,
            thumbnailHeight = 110 * ratio,

            // 可能有pedding, ready, uploading, confirm, done.
            state = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages = {},
            // 判断浏览器是否支持图片的base64
            isSupportBase64 = (function() {
                var data = new Image();
                var support = true;
                data.onload = data.onerror = function() {
                    if (this.width != 1 || this.height != 1) {
                        support = false;
                    }
                }
                data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                return support;
            })(),
            // 检测是否已经安装flash，检测flash的版本
            flashVersion = (function() {
                var version;

                try {
                    version = navigator.plugins['Shockwave Flash'];
                    version = version.description;
                } catch (ex) {
                    try {
                        version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                            .GetVariable('$version');
                    } catch (ex2) {
                        version = '0.0';
                    }
                }
                version = version.match(/\d+/g);
                return parseFloat(version[0] + '.' + version[1], 10);
            })(),
            supportTransition = (function() {
                var s = document.createElement('p').style,
                    r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
                s = null;
                return r;
            })(),

            // WebUploader实例
            uploader;


        if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {
            // flash 安装了但是版本过低。
            if (flashVersion) {
                (function(container) {
                    window['expressinstallcallback'] = function(state) {
                        switch (state) {
                            case 'Download.Cancelled':
                                alert('您取消了更新！')
                                break;

                            case 'Download.Failed':
                                alert('安装失败')
                                break;

                            default:
                                alert('安装已成功，请刷新！');
                                break;
                        }
                        delete window['expressinstallcallback'];
                    };

                    var swf = './expressInstall.swf';
                    // insert flash object
                    var html = '<object type="application/' +
                        'x-shockwave-flash" data="' + swf + '" ';

                    if (WebUploader.browser.ie) {
                        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                    }

                    html += 'width="100%" height="100%" style="outline:0">' +
                        '<param name="movie" value="' + swf + '" />' +
                        '<param name="wmode" value="transparent" />' +
                        '<param name="allowscriptaccess" value="always" />' +
                        '</object>';

                    container.html(html);

                })($wrap);

                // 压根就没有安转。
            } else {
                $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

            return;
        } else if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！');
            return;
        }
        // 负责view的销毁
        function removeFile(file) {
            var $li = $('#' + file.id);

            delete percentages[file.id];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }
        if (typeof guidGenerator36 != 'undefined') //给一个唯一ID
            pickerid = guidGenerator36();
        else
            pickerid = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        var uploaderStrdiv = ''
        if (opts.auto) {
            uploaderStrdiv +=
                // '<div class="uploader-list Uploadthelist"></div>' +
                '<div class="statusBar">' +
                '<div class="progress"><span class="text">0%</span><span class="percentage"></span></div>' +
                '<div class="info"></div>' +
                '<div class="btns">' +
                '<div class="' + pickerid + '">选择文件</div>'
            // '</div>'

        } else {
            uploaderStrdiv +=
                // '<div class="uploader-list"></div>' +
                '<div class="statusBar">' +
                '<div class="progress"><span class="text">0%</span><span class="percentage"></span></div>' +
                '<div class="info"></div>' +
                '<div class="btns">' +
                '<div class="' + pickerid + '">选择文件</div>' +
                '<div class="uploadBtn">开始上传</div>'
            // '</div>'
        }
        uploaderStrdiv += '<div style="display:none" class="UploadhiddenInput" >\
                         </div>'
        uploaderStrdiv += '</div>';
        target.append(uploaderStrdiv);

        var $list = target.find('.uploader-list'),
            $btn = target.find('.uploadBtn'), //手动上传按钮备用
            state = 'pending',
            $hiddenInput = target.find('.UploadhiddenInput'),
            uploader;
        var jsonData = {
            fileList: []
        };

        var webuploaderoptions = $.extend({

                // swf文件路径
                swf: 'Uploader.swf',
                // 文件接收服务端。
                server: 'http://webuploader.duapp.com/server/fileupload.php',
                // deleteServer: '/Home/DeleteFile',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '.' + pickerid,
                //不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                fileNumLimit: opts.fileNumLimit,
                fileSizeLimit: opts.fileSizeLimit,
                fileSingleSizeLimit: opts.fileSingleSizeLimit,
                accept: opts.accept
            },
            opts.innerOptions);
        var uploader = WebUploader.create(webuploaderoptions);

        //回发时还原hiddenfiled的保持数据
        var fileDataStr = hdFileData.val();
        if (fileDataStr && opts.PostbackHold) {
            jsonData = JSON.parse(fileDataStr);
            $.each(jsonData.fileList, function(index, fileData) {
                var newid = SuiJiNum();
                fileData.queueId = newid;
                $list.append('<div id="' + newid + '" class="item">' +
                    '<div class="info">' + fileData.name + '</div>' +
                    '<div class="state">已上传</div>' +
                    '<div class="del"></div>' +
                    '</div>');
            });
            hdFileData.val(JSON.stringify(jsonData));
        }
        uploader.on('ready', function() {
            window.uploader = uploader;
        });
        // 当有文件添加进来时执行，负责view的创建
        function addFile(file) {
            var $li = $('<li id="' + file.id + '">' +
                    '<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>' +
                    '<p class="progress"><span></span></p>' +
                    '</li>'),

                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find('p.imgWrap'),
                $info = $('<p class="error"></p>'),

                showError = function(code) {
                    switch (code) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text(text).appendTo($li);
                };

            if (file.getStatus() === 'invalid') {
                showError(file.statusText);
            } else {
                // @todo lazyload
                $wrap.text('预览中');
                uploader.makeThumb(file, function(error, src) {
                    var img;

                    if (error) {
                        $wrap.text('不能预览');
                        return;
                    }

                    if (isSupportBase64) {
                        img = $('<img src="' + src + '">');
                        $wrap.empty().append(img);
                    } else {
                        $.ajax('../../server/preview.php', {
                            method: 'POST',
                            data: src,
                            dataType: 'json'
                        }).done(function(response) {
                            if (response.result) {
                                img = $('<img src="' + response.result + '">');
                                $wrap.empty().append(img);
                            } else {
                                $wrap.text("预览出错");
                            }
                        });
                    }
                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
            }

            file.on('statuschange', function(cur, prev) {
                if (prev === 'progress') {
                    $prgress.hide().width(0);
                } else if (prev === 'queued') {
                    $li.off('mouseenter mouseleave');
                    $btns.remove();
                }

                // 成功
                if (cur === 'error' || cur === 'invalid') {
                    console.log(file.statusText);
                    showError(file.statusText);
                    $li.append($btns);
                    $li.on('mouseenter', enBtnsAnimate);

                    $li.on('mouseleave', unBtnsAnimate);

                    $btns.on('click', 'span', btnsPanel);
                    percentages[file.id][1] = 1;
                } else if (cur === 'interrupt') {
                    showError('interrupt');
                    $li.append($btns);
                    $li.on('mouseenter', enBtnsAnimate);

                    $li.on('mouseleave', unBtnsAnimate);

                    $btns.on('click', 'span', btnsPanel);
                } else if (cur === 'queued') {
                    $info.remove();
                    $prgress.css('display', 'block');
                    percentages[file.id][1] = 0;
                } else if (cur === 'progress') {
                    $info.remove();
                    $prgress.css('display', 'block');
                } else if (cur === 'complete') {
                    $prgress.hide().width(0);
                    $li.append('<span class="success"></span>');
                }

                $li.removeClass('state-' + prev).addClass('state-' + cur);
            });
            var enBtnsAnimate = function() {
                $btns.stop().animate({ height: 30 });
            };
            var unBtnsAnimate = function() {
                $btns.stop().animate({ height: 0 });
            };
            var btnsPanel = function() {
                var index = $(this).index(),
                    deg;

                switch (index) {
                    case 0:
                        uploader.removeFile(file);
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if (supportTransition) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                }
            };

            $li.on('mouseenter', enBtnsAnimate);

            $li.on('mouseleave', unBtnsAnimate);

            $btns.on('click', 'span', btnsPanel);
            $li.appendTo($queue);
        }

        function updateTotalProgress() {
            var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;

            $.each(percentages, function(k, v) {
                total += v[0];
                loaded += v[0] * v[1];
            });

            percent = total ? loaded / total : 0;


            spans.eq(0).text(Math.round(percent * 100) + '%');
            spans.eq(1).css('width', Math.round(percent * 100) + '%');
            updateStatus();
        }

        function updateStatus() {
            var text = '',
                stats;

            if (state === 'ready') {
                text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize(fileSize) + '。';
            } else if (state === 'confirm') {
                stats = uploader.getStats();
                if (stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '张照片至XX相册，' +
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                }

            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '张（' +
                    WebUploader.formatSize(fileSize) +
                    '），已上传' + stats.successNum + '张';

                if (stats.uploadFailNum) {
                    text += '，失败' + stats.uploadFailNum + '张';
                }
            }

            $info.html(text);
        }

        function setState(val) {
            var file, stats;

            if (val === state) {
                return;
            }

            $btn.removeClass('state-' + state);
            $btn.addClass('state-' + val);
            state = val;

            switch (state) {
                case 'pedding':
                    $placeHolder.removeClass('element-invisible');
                    $queue.hide();
                    $statusBar.addClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'ready':
                    $placeHolder.addClass('element-invisible');
                    $('.' + 'pickerid').removeClass('element-invisible');
                    $queue.show();
                    $statusBar.removeClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'uploading':
                    $('.' + 'pickerid').addClass('element-invisible');
                    $progress.show();
                    $btn.text('暂停上传');
                    break;

                case 'paused':
                    $progress.show();
                    $btn.text('继续上传');
                    break;

                case 'confirm':
                    $progress.hide();
                    $('.' + 'pickerid').removeClass('element-invisible');
                    $btn.text('开始上传');

                    stats = uploader.getStats();
                    if (stats.successNum && !stats.uploadFailNum) {
                        setState('finish');
                        return;
                    }
                    break;
                case 'finish':
                    stats = uploader.getStats();
                    if (stats.successNum) {
                        alert('上传成功');
                    } else {
                        // 没有成功的图片，重设
                        state = 'done';
                        location.reload();
                    }
                    break;
            }

            updateStatus();
        }


        $btn.on('click', function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            if (state === 'ready') {
                uploader.upload();
            } else if (state === 'paused') {
                uploader.upload();
            } else if (state === 'uploading') {
                uploader.stop();
            }
        });

        $info.on('click', '.retry', function() {
            uploader.retry();
        });

        $info.on('click', '.ignore', function() {
            uploader.removeFile(file);
        });

        $btn.addClass('state-' + state);
        updateTotalProgress();
        uploader.on('dialogOpen', function() {
            console.log('here');
        });
        uploader.onUploadProgress = function(file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            $percent.css('width', percentage * 100 + '%');
            percentages[file.id][1] = percentage;
            updateTotalProgress();
        };

        uploader.onFileQueued = function(file) {
            fileCount++;
            fileSize += file.size;

            if (fileCount === 1) {
                $placeHolder.addClass('element-invisible');
                $statusBar.show();
            }

            addFile(file);
            setState('ready');
            updateTotalProgress();
        };

        uploader.onFileDequeued = function(file) {
            fileCount--;
            fileSize -= file.size;

            if (!fileCount) {
                setState('pedding');
            }

            removeFile(file);
            updateTotalProgress();

        };

        uploader.on('all', function(type) {
            var stats;
            switch (type) {
                case 'uploadFinished':
                    setState('confirm');
                    break;

                case 'startUpload':
                    setState('uploading');
                    break;

                case 'stopUpload':
                    setState('paused');
                    break;

            }
        });

        uploader.onError = function(code) {
            alert('Eroor: ' + code);
        };
        uploader.on('uploadProgress', function(file, percentage) { //进度条事件
            var $li = target.find('#' + $(item)[0].id + file.id),
                $percent = $li.find('.progress .bar');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<span class="progress">' +
                    '<span  class="percentage"><span class="text"></span>' +
                    '<span class="bar" role="progressbar" style="width: 0%">' +
                    '</span></span>' +
                    '</span>').appendTo($li).find('.bar');
            }

            $li.find('span.webuploadstate').html('上传中');
            $li.find(".text").text(Math.round(percentage * 100) + '%');
            $percent.css('width', percentage * 100 + '%');
        });
        uploader.on('uploadSuccess', function(file, response) { //上传成功事件
            debugger
            if (response.state == "error") {
                target.find('#' + $(item)[0].id + file.id).find('span.webuploadstate').html(response.message);
            } else {
                target.find('#' + $(item)[0].id + file.id).find('span.webuploadstate').html('已上传');
                $hiddenInput.append('<input type="text" id="hiddenInput' + $(item)[0].id + file.id + '" class="hiddenInput" value="' + response.message + '" />')
            }


        });

        uploader.on('uploadError', function(file) {
            target.find('#' + $(item)[0].id + file.id).find('span.webuploadstate').html('上传出错');
        });

        uploader.on('uploadComplete', function(file) { //全部完成事件
            target.find('#' + $(item)[0].id + file.id).find('.progress').fadeOut();

        });

        uploader.on('all', function(type) {
            if (type === 'startUpload') {
                state = 'uploading';
            } else if (type === 'stopUpload') {
                state = 'paused';
            } else if (type === 'uploadFinished') {
                state = 'done';
            }

            if (state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        //删除时执行的方法
        uploader.on('fileDequeued', function(file) {
            debugger

            var fullName = $("#hiddenInput" + $(item)[0].id + file.id).val();
            if (fullName != null) {
                $.post(webuploaderoptions.deleteServer, { fullName: fullName }, function(data) {
                    alert(data.message);
                })
            }
            $("#" + $(item)[0].id + file.id).remove();
            $("#hiddenInput" + $(item)[0].id + file.id).remove();

        })
        //删除
        $list.on("click", ".webuploadDelbtn", function() {
            debugger
            alert("hi")
            var $ele = $(this);
            var id = $ele.parent().attr("id");
            var id = id.replace($(item)[0].id, "");

            var file = uploader.getFile(id);
            uploader.removeFile(file);
        });

    }
    $.fn.GetFilesAddress = function(options) {
        var ele = $(this);
        var filesdata = ele.find(".UploadhiddenInput");
        var filesAddress = [];
        filesdata.find(".hiddenInput").each(function() {
            filesAddress.push($(this).val());
        })
        return filesAddress;

    }

    $.fn.powerWebUpload = function(options) {
        var ele = this;
        if (typeof WebUploader == 'undefined') {
            var casspath = applicationPath + "/js/webuploader.css";
            $("<link>").attr({ rel: "stylesheet", type: "text/css", href: casspath }).appendTo("head");
            var jspath = applicationPath + "/js/webuploader.js";
            $.getScript(jspath).done(function() {
                    initWebUpload(ele, options);
                })
                .fail(function() {
                    alert("请检查webuploader的路径是否正确!")
                });
        } else {
            initWebUpload(ele, options);
        }
    }
});