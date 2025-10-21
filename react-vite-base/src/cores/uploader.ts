import { dynamic, FileInfo, FileStatus, UploaderProps } from "@/types/utils";
import { withPost } from ".";

class Uploader {
    que: FileInfo[] = [];
    data: dynamic[] = []; 
    inx: number = -1; 
    uploading: boolean = false; 
    debug: boolean = true; 
    api: string | null = null;


    onChange: (file: FileInfo) => void;
    onComplete: (file: FileInfo, response: dynamic) => void;
    onError: (file: FileInfo, _error: any) => void;
    onCancel: (file: FileInfo, status: FileStatus) => void;
    
    constructor(callbacks: UploaderProps){
        this.onChange = callbacks.onChange;
        this.onComplete = callbacks.onComplete;
        this.onError = callbacks.onError;
        this.onCancel = callbacks.onCancel;
    }

    getFile(){
        return this.que[this.inx] || null;
    }

    notify(){
        const file = this.getFile();
        if (file) this.onChange(file);
    }

    // cancelRequest(fileId: string){
    //     if(this.que.length < 1) return;
    //     const _file = this.getFile();
    //     if(_file.ID == fileId && typeof _file.cancelRequest === "function"){
    //         console.log(`>>>`, _file.cancelRequest)
    //         _file.cancelRequest();
    //         this.uploading = !1;
    //         return;
    //     }

    //     this.onCancel(
    //         this.que.find((file: FileInfo) => file.ID == fileId)!,
    //         FileStatus.Canceled
    //     );
        
    //     this.handleQue();
    // }

    cancelRequest(fileId: string) {
        console.log(`cancel request submited`)
        const finx = this.que.findIndex(f => f.ID === fileId);
        if (finx == -1) return;
        const file = this.que[finx];
        if (finx == this.inx && typeof file.cancelRequest === "function") {
            file.cancelRequest();
            this.uploading = false;
        }

        // this.onCancel(file, FileStatus.Canceled);
        this.que.splice(finx, 1);

        if (finx <= this.inx) {
            this.inx--;
        }

        if (!this.uploading && this.que.length > this.inx + 1) {
            this.handleQue();
        }
    }


    append(data: dynamic){
        if (!this.data) {
            this.data = [];
        }
        this.data.push(data);
    }

    setApi(api: string){
        this.api = api;
    }

    uploadFile(){
        const file = this.getFile();
        if(this.debug) console.log(`UPLOAD_FILE`, file);
        const fd = new FormData()
        const dd = this.data[this.inx];
        fd.append(`size`, dd.size)
        fd.append(`file`, dd.file)
        withPost(
            this.api ||  ``,
            fd,
            undefined, undefined, undefined,
            (p) => {
                file.progress = Math.floor((p.progress || 0) * 100);
                this.notify();
            },
            c => {
                file.cancelRequest = c
            },
            true
        ).then(response => {
            file.status = FileStatus.Success;
            file.cancelRequest = null;
            this.notify();
            this.onComplete(file, response as dynamic);
            this.uploading = !1;
            this.handleQue();
        })
        .catch(_error => {
            file.status = FileStatus.Error;
            file.cancelRequest = null;
            this.notify();
            this.uploading = !1;
            if(_error?.cancelled){
              this.onCancel(file, _error);
            }else{
              this.onError(file, _error);
            }
            this.handleQue();
        });
        
    }

    handleQue(){
        if(this.que.length > this.inx + 1 && !this.uploading){
            this.inx++;
            this.uploading = true;
            this.getFile().status = FileStatus.Uploading;
            this.notify();
            this.uploadFile();
        }
    }

    addToQue(file: FileInfo){
        if(this.debug){
            console.log(`NEW FILE ADD_INTO_QUE`, file);
        }

        this.que.push(file);
        this.handleQue();
    }
}
export default Uploader;