 const getActiveUploadObj = function() {
     try {
         return new ActiveXObject('TXFTNActiveX.FTNUpload');
     }catch(e) {
         return 'nextSuccessor';
     }
 }

 const getFlashUploadObj = function() {
     if (supportFlash()) {// flash获取函数尚未提供
        const str = '<object type="application/x-shockwave-flash"></object>'
        return $(str).appendTo($('body'));
     }
     return 'nextSuccessor';
 }

 const getFormUploadObj = function() {
     return $('<form><input name="file" type="file" /></form>').appendTo($('body'));
 }

 const getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObj);
 console.log(getUploadObj);