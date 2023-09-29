using FluentValidation;
using Makassed.Api.Models;
using Makassed.Api.Services.Policy;

namespace Makassed.Api.Validators
{
    public class PolicyValidator : AbstractValidator<Policy>
    {
        private readonly IPolicyService _policyService;

        public PolicyValidator(IPolicyService policyService)
        {
            _policyService = policyService;

            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("Policy name is required.")
                .MustAsync(async (name, cancellation) =>
                {
                    return await _policyService.IsUniqueName(name);
                });
        }
    }
}
