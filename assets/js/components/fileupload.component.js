/**
 * <fileupload>
 * -----------------------------------------------------------------------------
 * A File Upload.
 *
 * > Be careful adding other Vue.js lifecycle callbacks in this file!  The
 * > finnicky combination of Vue transitions and bootstrap modal animations used
 * > herein work, and are very well-tested in practical applications.  But any
 * > changes to that specific cocktail could be unpredictable, with unsavory
 * > consequences.
 *
 * @type {Component}
 *
 * @event close   [emitted when the closing process begins]
 * @event opened  [emitted when the opening process is completely done]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('fileupload', {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    props: [
        'syncing',// « 2-way bound (:syncing.sync="…")
        'file', // « 2-way bound (:syncing.sync="…")
        'isinvalid',
        'accept', // image/*
    ],

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: function () {

        return {
            uploadError: false
        };

    },

    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    template: `
    <div>
        <div class="input-group" v-if="!file">
                <div class="spinner-border mr-2 text-primary" role="status" v-if="syncing">
                  <span class="sr-only">Loading...</span>
                </div>
                <div class="input-group-prepend">
                  <span class="input-group-text">Upload</span>
                </div>
                <div class="custom-file"  >
                  <input type="file" :class="[isinvalid ? 'is-invalid' : '']" :disabled="syncing" :accept="accept" class="custom-file-input" @change="changeFileInput($event.target.files)" id="mediafile"/>
                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                </div>
                <p class="text-danger" v-if="uploadError"><small>An error occured while uploading your file.</small>
                </p>
        </div>
        <div class="image-area rounded" v-else="file!=''">
                <img v-bind:src="file" class="rounded" alt="thumbnail">
                <a class="remove-image" @click="removeThumbnail()" style="display: inline;">&#215;</a>
        </div>
    </div>
    `,
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function () {

    },

    mounted: function () {

    },
    // ^Note that there is no `beforeDestroy()` lifecycle callback in this
    // component. This is on purpose, since the timing vs. `leave()` gets tricky.

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {

        removeThumbnail: function () {

            this.uploadError = false;
            this.$emit('update:file', "");
            this.$forceUpdate();

        },

        changeFileInput: async function (files) {

            console.log("File save");
            console.log(files);

            if (files.length !== 1) {
                throw new Error(
                    "Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked."
                );
            }

            var selectedFile = files[0];

            if (!selectedFile) {
                return;
            }

            // Clear out any error messages about not providing an image.
            this.uploadError = false;
            this.$emit('update:syncing', true);

            this.$forceUpdate();

            var result = await Cloud.uploadfile.with({
                image: selectedFile,
            });

            this.$emit('update:syncing', false);

            if (result) {
                this.$emit('update:file', result.image_url);
            } else {
                this.uploadError = true;
            }

            this.$forceUpdate();

        },

    }
});
