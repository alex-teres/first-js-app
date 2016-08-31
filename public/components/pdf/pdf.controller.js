import 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
class pdfCtrl {
constructor(){
    this.pdfDoc = null;
    this.pageNum = 1;
    this.pageRendering = true;
    this.pageNumPending = null;
    this.scale = 1;
    this.canvas = document.getElementById('the-canvas');
    this.ctx = this.canvas.getContext('2d');

    PDFJS.getDocument('api/uploads/pdf.pdf').then((pdfDoc_)=>{
        this.pdfDoc = pdfDoc_;
        this.pageCount = this.pdfDoc.numPages;
        this.renderPage(this.pageNum);
    });
}
    renderPage (num){
        this.pageRendering = true;
        this.pdfDoc.getPage(num).then((page)=>{
            var viewport = page.getViewport(this.scale);
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;
            var renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(()=>{
                this.pageRendering = false;
                if (this.pageNumPending !== null) {
                    this.renderPage(this.pageNumPending);
                    this.pageNumPending = null;
                }
            });
        });
    }
    queueRenderPage(num){
    if (this.pageRendering) {
        this.pageNumPending = num;
    } else {
        this.renderPage(num);
    }
    }
    onPrevPage (){
        if (this.pageNum <= 1) {
            return;
        }
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    }
    onNextPage (){
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    }

}

export default pdfCtrl;