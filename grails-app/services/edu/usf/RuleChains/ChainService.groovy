package edu.usf.RuleChains

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import grails.converters.*

class ChainService {
    static transactional = true
    def grailsApplication
    def jobService
    
    def listChains(String pattern = null) { 
        if(!!pattern) {
            return [chains: Chain.list().findAll(fetch:[links:"eager"]) {
                Pattern.compile(pattern.trim()).matcher(it.name).matches()
            }]
        } else {
            return [ chains: Chain.list() ]
        }
    }
    def addChain(String name) {
        if(!!name) {
            def chain = [ name: name.trim() ] as Chain
            if(!chain.save(failOnError:false, flush: true, insert: true, validate: true)) {
                return [ error : "Name value '${chain.errors.fieldError.rejectedValue}' rejected" ]
            } else {
                return [ chain: chain ]
            }
        }
        return [ error: "You must supply a name" ]
    }
    def modifyChain(String name,String newName) {
        if(!!name && !!newName) {
            def chain = Chain.findByName(name.trim())
            if(!!chain) {
                System.out.println(newName)
                chain.name = newName.trim()
                if(!chain.save(failOnError:false, flush: true, validate: true)) {
                    return [ error : "Name value '${chain.errors.fieldError.rejectedValue}' rejected" ]
                } else {
                    return [ chain: chain ]
                }
            }
            return [ error : "Chain named ${name} not found!"]
        }
        return [ error : "You must supply a name and new name for the target chain"]
    }
    def deleteChain(String name) {
        if(!!name) {
            def chain = Chain.findByName(name.trim())
            if(!!chain) {
                chain.delete()
                return [ success : "Chain deleted" ]
            }
            return [ error : "Chain named ${name} not found!"]
        }
        return [ error : "You must supply a name for the target Chain"]
    }
    def getChain(String name) {
        if(!!name) {
            def chain = Chain.findByName(name.trim())
            if(!!chain) {
                return [ chain: chain ]
            }
            return [ error : "Chain named ${name} not found!"]
        }
        return [ error : "You must supply a name for the target Chain"]
    }
    def addChainLink(String name,def newLink) {
        def chain = Chain.findByName(name.trim())
        if(!!chain) {
            def rule = Rule.findByName(newLink.rule.name)
            if(!!rule) {
                newLink.rule = rule
                Link link = new Link(newLink)
                System.out.println(link.sequenceNumber)
                def sequenceNumber = link.sequenceNumber+1
                chain.links.findAll { l ->
                    (l.sequenceNumber >= link.sequenceNumber)
                }.sort { a, b -> b.sequenceNumber <=> a.sequenceNumber }.each { l ->
                    System.out.println(l.sequenceNumber)
                    l.sequenceNumber = sequenceNumber
                    sequenceNumber++
                    if(!l.save(failOnError:false, flush: true, validate: true)) {
                        l.errors.allErrors.each {
                            println it
                        }    
                        return [ error : "'${l.errors.fieldError.field}' value '${l.errors.fieldError.rejectedValue}' rejected" ]                
                    }
                }
                try {
                    if(!chain.addToLinks(link).save(failOnError:false, flush: false, validate: true)) {
                        chain.errors.allErrors.each {
                            println "Error:"+it
                        }           
                        return [ error : "'${chain.errors.fieldError.field}' value '${chain.errors.fieldError.rejectedValue}' rejected" ]
                    } else {
                        sequenceNumber = 1
                        System.out.println("New Sequence"+link.sequenceNumber)
                        chain.links.sort { a, b -> a.sequenceNumber <=> b.sequenceNumber }.each { l ->
                            l.sequenceNumber = sequenceNumber
                            sequenceNumber++
                            if(!l.save(failOnError:false, flush: false, validate: true)) {
                                l.errors.allErrors.each {
                                    println it
                                }    
                                return [ error : "'${l.errors.fieldError.field}' value '${l.errors.fieldError.rejectedValue}' rejected" ]                
                            }
                        }
                        return [ chain: chain ]
                    }                                    
                } catch(Exception ex) {
                    link.errors.allErrors.each {
                        println it                        
                    }          
                    return [ error: "'${link.errors.fieldError.field}' value '${link.errors.fieldError.rejectedValue}' rejected" ]                
                }
            }
            return [ error : "Rule in link named ${newLink.rule.name} not found!"]
        }
        return [ error : "Chain named ${name} not found!"]
    }
    def deleteChainLink(String name,def sequenceNumber) {
        def chain = Chain.findByName(name.trim())
        if(!!chain) {
            def link = chain.links.find { it.sequenceNumber = sequenceNumber }
            if(!!link) {
                if(!chain.removeFromLinks(link).save(failOnError:false, flush: true, validate: true)) {
                    chain.errors.allErrors.each {
                        println "Error:"+it
                    }           
                    return [ error : "'${chain.errors.fieldError.field}' value '${chain.errors.fieldError.rejectedValue}' rejected" ]                    
                } else {
                    chain.refresh()
                    sequenceNumber = 1
                    System.out.println("New Sequence"+link.sequenceNumber)
                    chain.links.sort { a, b -> a.sequenceNumber <=> b.sequenceNumber }.each { l ->
                        l.sequenceNumber = sequenceNumber
                        sequenceNumber++
                        if(!l.save(failOnError:false, flush: true, validate: true)) {
                            l.errors.allErrors.each {
                                println it
                            }    
                            return [ error : "'${l.errors.fieldError.field}' value '${l.errors.fieldError.rejectedValue}' rejected" ]                
                        }
                    }
                    return [ chain: chain ]                    
                }
            }
            return [ error : "Link sequence Number ${sequenceNumber} not found!"]
        }
        return [ error : "Chain named ${name} not found!"]
    }
    def getSources() {
        String sfRoot = "sessionFactory_"
        return [ 
            sources: grailsApplication.mainContext.beanDefinitionNames.findAll{ it.startsWith( sfRoot ) }.collect { sf ->
                sf[sfRoot.size()..-1]
            },
            actions: [
                execute: ExecuteEnum.values().collect { it.name() },
                result: ResultEnum.values().collect { it.name() },
                link: LinkEnum.values().collect { it.name() }
            ],
            jobGroups: jobService.listChainJobs().jobGroups
            
        ]
        
    }
    def modifyChainLink(String name,def sequenceNumber,def updatedLink) {
        def chain = Chain.findByName(name.trim())
        if(!!chain) {
            def link = chain.links.find { it.sequenceNumber.toString() == sequenceNumber }
            if(!!link) {
                link.properties['sourceName','inputReorder','outputReorder','sequenceNumber','executeEnum','linkEnum','resultEnum'] = updatedLink
                link.rule = Rule.get(updatedLink.rule.id)
                if(!link.save(failOnError:false, flush: true, validate: true)) {
                    link.errors.allErrors.each {
                        println it
                    }           
                    return [ error : "'${link.errors.fieldError.field}' value '${link.errors.fieldError.rejectedValue}' rejected" ]                
                }
                return [ link : link]
            }
            return [ error : "Link with sequence ${sequenceNumber} not found!"]
        }
        return [ error : "Chain named ${name} not found!"]
    }
    def modifyChainLinks(String name,def links) {
        def chain = Chain.findByName(name.trim())
        if(!!chain) {
            chain.links.clear()
            if(!chain.save(failOnError:false, flush: true, validate: true)) {
                chain.errors.allErrors.each {
                    println it
                }           
                return [ error : "'${chain.errors.fieldError.field}' value '${chain.errors.fieldError.rejectedValue}' rejected" ]                
            } else {
                links.sort { it.sequenceNumber }.each { l ->
                    chain.addToLinks(l as Link)
                }
                if(!chain.save(failOnError:false, flush: true, validate: true)) {
                    chain.errors.allErrors.each {
                        println it
                    }           
                    return [ error : "'${chain.errors.fieldError.field}' value '${chain.errors.fieldError.rejectedValue}' rejected" ]                
                } else {
                    return [ chain : chain ]
                }
            }
        }
        return [ error : "Chain named ${name} not found!"]
    }
    
}