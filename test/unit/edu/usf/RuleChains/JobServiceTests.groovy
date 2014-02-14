package edu.usf.RuleChains



import grails.test.mixin.*
import org.junit.*
import groovy.time.*

/**
 * Testing JobService handling of tracking quartz job execution,
 * chain service handler execution and quartz scheduling.
 * <p>
 * Developed originally for the University of South Florida
 * 
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(JobService)
@Mock([JobHistory,JobLog])
class JobServiceTests {

    void testAddJobHistory() {
        def jobService = new JobService()
        def result = jobService.addJobHistory("testHistory")
        assert result.jobHistory.name == "testHistory"
    }
    
    void testFindJobHistory() {
        def jobService = new JobService()
        def h = new JobHistory(name: "testHistory")
        h.save()
        def result = jobService.findJobHistory("testHistory")
        assert result.jobHistory.name == "testHistory"
    }
    
    void testGetJobLogs() {
        def jobService = new JobService()
        def h = new JobHistory(name: "testHistory")
        h.save()
        use (TimeCategory) {
            [
                [
                    line: "Line 1",
                    logTime: new Date() + 1.seconds
                ] as JobLog,
                [
                    line: "Line 2",
                    logTime: new Date() + 2.seconds
                ] as JobLog,
                [
                    line: "Line 3",
                    logTime: new Date() + 3.seconds
                ] as JobLog,
                [
                    line: "Line 4",
                    logTime: new Date() + 4.seconds
                ] as JobLog                        
            ].each { jh ->
                jh.save()
            }
        }
        def result = jobService.getJobLogs("testHistory",3,0)
        assert result.jobLogs.size() == 3
    }
}
