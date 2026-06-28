import { CodeExample, Feature, BackoffStrategy } from '../types/content';

export const MAVEN_SNIPPET: CodeExample = {
  id: 'maven',
  title: 'Maven',
  description: 'Add to your pom.xml',
  language: 'xml',
  code: `<dependency>
    <groupId>io.github.sayanth-ranjith</groupId>
    <artifactId>cheese-retry</artifactId>
    <version>0.0.11</version>
</dependency>`,
};

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'annotation',
    title: 'Annotation',
    tag: 'Recommended',
    description: 'Drop @CheeseRetry on any Spring Boot method — no wiring required.',
    language: 'java',
    code: `@Service
public class ApiService {

    // Simplest form — uses all defaults
    @CheeseRetry
    public String fetchData() {
        return callExternalApi();
    }

    // Full control over retry behaviour
    @CheeseRetry(
        maxAttempts = 5,
        delayInMillis = 500,
        retryPredicateType = RetryPredicateType.TYPED_BASED_RETRY,
        retryOn = {IOException.class, TimeoutException.class},
        backoffStrategyType = BackoffStrategyType.EXPONENTIAL
    )
    public String fetchDataWithBackoff() {
        return callExternalApi();
    }
}`,
  },
  {
    id: 'programmatic',
    title: 'Fluent API',
    description: 'Build a policy in code when you need runtime control.',
    language: 'java',
    code: `RetryPolicy policy = RetryPolicy.builder()
    .maxAttempts(5)
    .retryPredicate(new AlwaysRetryPredicate())
    .backoffStrategy(new ExponentialBackoffStrategy(1000))
    .build();

RetryExecutor executor = new CoreRetryExecutor(policy);

try {
    executor.execute(() -> fetchData());
} catch (Exception e) {
    throw new RuntimeException("Failed after retries", e);
}`,
  },
  {
    id: 'payment',
    title: 'Payment Service',
    description: 'Real-world example: retry a payment gateway with exponential backoff.',
    language: 'java',
    code: `public class PaymentService {

    public void processPayment(Payment payment) throws Exception {
        RetryPolicy policy = RetryPolicy.builder()
            .maxAttempts(3)
            .retryPredicate(new AlwaysRetryPredicate())
            .backoffStrategy(new ExponentialBackoffStrategy(1000))
            .build();

        new CoreRetryExecutor(policy).execute(() -> {
            paymentGateway.charge(payment);
            return null;
        });
    }
}`,
  },
  {
    id: 'database',
    title: 'Database Repo',
    description: 'Retry transient DB failures with a fixed delay.',
    language: 'java',
    code: `@Repository
public class UserRepository {

    @CheeseRetry(
        maxAttempts = 3,
        delayInMillis = 500,
        retryOn = {DataAccessException.class}
    )
    public User save(User user) {
        return userJpaRepository.save(user);
    }
}`,
  },
];

export const FEATURES: Feature[] = [
  {
    icon: '🪶',
    title: 'Lightweight & simple',
    description: 'Minimal dependencies. You can read the whole source in an afternoon.',
  },
  {
    icon: '🏷️',
    title: 'Annotation-based',
    description: 'Spring Boot auto-configuration ready. One annotation, zero boilerplate.',
  },
  {
    icon: '⛓️',
    title: 'Fluent API',
    description: 'Prefer code over annotations? Build policies with a readable builder.',
  },
  {
    icon: '📈',
    title: 'Multiple backoff strategies',
    description: 'Fixed, Linear, or Exponential — pick the right ramp for your use case.',
  },
  {
    icon: '🎯',
    title: 'Conditional retries',
    description: 'Retry only on the exceptions you care about. Everything else falls through.',
  },
  {
    icon: '🛡️',
    title: 'Max attempt limits',
    description: 'Set a hard cap on attempts so runaway retries never hammer your services.',
  },
];

export const BACKOFF_STRATEGIES: BackoffStrategy[] = [
  {
    name: 'Fixed',
    description: 'Same wait every time. Predictable and simple.',
    color: '#F0A500',
    pattern: [1, 1, 1, 1, 1],
  },
  {
    name: 'Exponential',
    description: 'Doubles each attempt. Backs off aggressively under sustained load.',
    color: '#E05C5C',
    pattern: [1, 2, 4, 8, 16],
  },
];

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Quick Start', href: '#quickstart' },
  { label: 'Examples', href: '#examples' },
  { label: 'Backoff', href: '#backoff' },
];
