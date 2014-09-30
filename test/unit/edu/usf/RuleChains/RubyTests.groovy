package edu.usf.RuleChains



import grails.test.mixin.*
import org.junit.*

/**
 * Testing Ruby domain class
 * <p>
 * Developed originally for the University of South Florida
 * 
 * @author <a href='mailto:james@mail.usf.edu'>James Jones</a> 
 * 
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Ruby)
class RubyTests {
    /**
     * Testing creating a new Ruby
     */
    void testNewPython() {
        mockDomain(Ruby)
        def rs = new RuleSet(name: "newRuleSet")
        rs.isSynced = false
        rs.save()
        def r = new Ruby(name: 'testRule',ruleSet: rs)
        assert r.validate()
    }
    /**
     * Testing a missing ruleset
     */
    void testPythonRuleMissingRuleSet() {
        mockDomain(Ruby)
        def r = new Ruby(name: 'testRule')
        assert r.validate() == false
        assert r.errors.hasFieldErrors("ruleSet")
        assert r.errors.getFieldError("ruleSet").rejectedValue == null
    }
}
