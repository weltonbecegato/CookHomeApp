import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector   : 'fuse-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class FuseConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<FuseConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
    )
    {
        this.confirmMessage = data;
    }

}
