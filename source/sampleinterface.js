;(function(context){
   if(context.interface == undefined){


    context.interface = {

        pageHash: "",
        likeQStrData: "-qrstr"

        cbData:undefined,

        historyData: {
        },

        alertMessages: {
            unable: "Desculpe, não disponível",
            unableYet: "Desculpe, ainda não disponível"
        },

        endCharging: function(){

            jQuery('#charger').hide();

        },

        startCharging: function(){


            jQuery('#charger').show();
        },

        changeTo: function(goinTo, quiet){

            var goTo, argNum, aCallBackArgData;


            aCallBackArgData = this.cbData;

            if( goinTo.indexOf(this.likeQStrData) > 0 ){

                goTo = goinTo.substring(0, goinTo.indexOf(this.likeQStrData));


                argNum = goinTo.substring(goinTo.indexOf(this.likeQStrData)).replace(this.likeQStrData, '');


            } else {

                goTo = goinTo;
            }

            elemGoto = jQuery('#interface-' + goTo );


            if( !elemGoto.hasClass('hidden') ){
               if(elemGoto.attr('data-callback')){
                window[elemGoto.attr('data-callback')](this.sampleDecode(argNum), aCallBackArgData);
                return false;
            }
        }


        if(elemGoto.length){

            if(elemGoto.attr('data-callback')){


                window[elemGoto.attr('data-callback')](this.sampleDecode(argNum), aCallBackArgData);

            }
                    // else {

                        jQuery('.interface').addClass('hidden');
                        elemGoto.removeClass('hidden');

                    // }

                } else {

                    if(this.logged){

                        this.changeTo('homepage');

                        if(!quiet)
                            this.unableYet();

                    } else {

                        this.changeTo('login');

                    }


                }


            },

            sampleError: function(message, redirect){

                if(!redirect)
                    redirect = 'homepage';

                this.unableYet(true, message);

                this.changeTo(redirect, true);

                return false;


            },

            unableYet: function(yet, message){


                if(!yet && !message){

                    alert(this.alertMessages.unable);

                } else if(message) {

                    alert(message);

                } else {

                    alert(this.alertMessages.unable);

                }

            },



            sampleEncode: function(str){

                if(str)
                    return str.replace('/', '-');
                else
                    return str;
            },

            sampleDecode: function(str){

                if(str)
                    return str.replace('-', '%2F');
                else
                    return '';
            },

            sampleNavigate: function(goTo, callbkData, messageError){


                this.cbData = callbkData;

                var hashParam = context.location.hash.substring(1);


                if(hashParam && hashParam != "" && hashParam == goTo){

                    if(goTo === 'unable'){

                        this.unableYet();

                        return false;

                    }


                    if(goTo){

                        this.changeTo(goTo);

                        if(this.menuStatus)

                            this.menuToggle();

                    } else {

                        this.unableYet();

                    }

                } else {

                    context.location.hash = ( goTo == undefined ) ? 'indisponivel': this.sampleEncode(goTo);
                }

            },



            start: function(){




                var hashParam = context.location.hash.substring(1);
                this.pageHash = context.location.hash;
                this.hashParam = hashParam;
                this.loadStatus(this.statusList.length);


                if( hashParam != ""){

                    if( hashParam.indexOf('/') != -1 ){

                        hashParam = hashParam.substr(0, hashParam.indexOf('/'));

                    }


                    if(!this.logged){

                        if(hashParam == 'tolog'){

                            this.logged = true;
                            this.sampleNavigate('homepage');

                        } else {

                            this.sampleNavigate('login');
                        }

                    } else {

                        this.sampleNavigate(hashParam, this.cbData);

                    }


                } else {

                    this.sampleNavigate('homepage');

                }
            }
        };

    }
})(window);
