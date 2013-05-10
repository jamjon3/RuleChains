/**
 * Testing AJAX Plugin for handling MessageService Topic & Queue REST Methods via AJAX
 * 
 * Depends on: JQuery
 *  
 */
(function($) {

    $.ruleChains = {
        job: {
            GETlistChainJobs: function(json,callback) {
                json = jQuery.extend({
                    name: ""
                },json);
                $.ajax({
                    url: "/RuleChains/job/",
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
//                    data: ($.trim(json.pattern).length < 1)?{}:{
//                        pattern: $.trim(json.pattern)
//                    },
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });        
            },
            POSTmergescheduleChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    mergeName: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/',
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({
                        name: json.name,
                        mergeName: json.mergeName
                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                                
            },
            PUTcreateChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/'+json.name,
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({ 
                        cronExpression: json.cronExpression,
                        input: ("input" in json)?json.input:[]
                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
            },
            POSTupdateChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    newName: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/'+json.name,
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({
                        newName: json.newName
                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            DELETEremoveChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/'+json.name,
                    type: "DELETE",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                                
            },
            DELETEunscheduleChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    cronExpression: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/'+json.name+'/'+encodeURIComponent(json.cronExpression),
                    type: "DELETE",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                                
            },
            POSTrescheduleChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    cronExpression: "",
                    cron: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/'+json.name+'/'+encodeURIComponent(json.cronExpression),
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({
                        cron: json.cron
                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                                
            },
            PUTaddscheduleChainJob: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    cronExpression: ""
                },json);
                $.ajax({
                    url: '/RuleChains/job/'+json.name+'/'+encodeURIComponent(json.cronExpression),
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
//                    data: JSON.stringify({ 
//                        cronExpression: json.cronExpression,
//                        input: ("input" in json)?json.input:[]
//                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            }
        },
        chain: {
            GETlistChains: function(json,callback) {
                json = jQuery.extend({
                    pattern: ""
                },json);
                $.ajax({
                    url: "/RuleChains/chain/",
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: ($.trim(json.pattern).length < 1)?{}:{
                        pattern: $.trim(json.pattern)
                    },
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });        
            },
            PUTaddChain: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/chain/',
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                

            },
            POSTmodifyChain: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSet: {
                        name: ""
                    }
                },json);
                $.ajax({
                    url: '/RuleChains/chain/'+json.name,
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            DELETEdeleteChain: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/chain/'+json.name,
                    type: "DELETE",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            GETgetChain: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/chain/'+json.name,
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            PUTaddChainLink: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/chain/'+json.name,
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({ link: json.link }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
            },
            GETgetSources: function(json,callback) {
                json = jQuery.extend({
                    pattern: ""
                },json);
                $.ajax({
                    url: "/RuleChains/source/",
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
//                    data: ($.trim(json.pattern).length < 1)?{}:{
//                        pattern: $.trim(json.pattern)
//                    },
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });        
            },
            DELETEdeleteChainLink: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    sequenceNumber: 1
                },json);
                $.ajax({
                    url: '/RuleChains/chain/'+json.name+'/'+json.sequenceNumber,
                    type: "DELETE",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            POSTmodifyChainLink: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    link: {
                        sequenceNumber: 1
                    }
                },json);
                $.ajax({
                    url: '/RuleChains/chain/'+json.name+'/'+json.link.sequenceNumber,
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({ link:json.link }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                                
            }
        
        },
        ruleSet: {
            GETlistRuleSets: function(json,callback) {
                json = jQuery.extend({
                    pattern: ""
                },json);
                $.ajax({
                    url: "/RuleChains/ruleSet/",
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: ($.trim(json.pattern).length < 1)?{}:{
                        pattern: $.trim(json.pattern)
                    },
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });
            },
            PUTaddRuleSet: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/',
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                

            },
            GETgetRuleSet: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.name,
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            DELETEdeleteRuleSet: function(json,callback) {
                json = jQuery.extend(true,{
                    name: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.name,
                    type: "DELETE",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            POSTmodifyRuleSet: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSet: {
                        name: ""
                    }
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.name,
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            GETgetRule: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSetName: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.ruleSetName.trim()+'/'+json.name.trim(),
                    type: "GET",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    // data: JSON.stringify(json),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                                
            },
            PUTaddRule: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSetName: "",
                    serviceType: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.ruleSetName.trim()+'/'+json.name.trim(),
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({ serviceType: json.serviceType }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
                
            },
            POSTupdateRule: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSetName: "",
                    rule: {
                        
                    }
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.ruleSetName.trim()+'/'+json.name.trim(),
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    data: JSON.stringify({ 
                        rule: json.rule 
                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
            },
            POSTupdateRuleName: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSetName: "",
                    newName: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.ruleSetName.trim()+'/'+json.name.trim()+'/'+json.newName.trim(),
                    type: "POST",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
//                    data: JSON.stringify({ 
//                        rule: json.rule 
//                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
            },
            DELETEdeleteRule: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSetName: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.ruleSetName.trim()+'/'+json.name.trim(),
                    type: "DELETE",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
//                    data: JSON.stringify({ 
//                        rule: json.rule 
//                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
            },
            PUTmoveRule: function(json,callback) {
                json = jQuery.extend(true,{
                    name: "",
                    ruleSetName: "",
                    newName: ""
                },json);
                $.ajax({
                    url: '/RuleChains/ruleSet/'+json.ruleSetName.trim()+'/'+json.name.trim()+'/'+json.newName.trim(),
                    type: "PUT",
                    dataType : "json",
                    beforeSend: function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
//                    data: JSON.stringify({ 
//                        rule: json.rule 
//                    }),
                    success: callback,
                    error: function (jqXHR,  textStatus, errorThrown) {
                        if (jqXHR.status === 0) {
                            // Session has probably expired and needs to reload and let CAS take care of the rest
                            alert('Your session has expired, the page will need to reload and you may be asked to log back in');
                            // reload entire page - this leads to login page
                            window.location.reload();
                        }
                    }
                });                                
            },
            
        }
    };
})(jQuery);       


